import pkg from 'pg';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid'; // para generar UUIDs en Node.js

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false, // Requerido por Supabase
  },
});

export class MovieModel {
  static async getAll({ genre }) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT id, title, year, director, duration, poster, rate FROM movie;'
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async getById({ id }) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT id, title, year, director, duration, poster, rate FROM movie WHERE id = $1;',
        [id]
      );
      if (result.rows.length === 0) return null;
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async create({ input }) {
    const { title, year, director, duration, poster, rate } = input;
    const client = await pool.connect();
    const uuid = uuidv4(); // genera UUID con Node.js
    try {
      await client.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate) 
         VALUES($1, $2, $3, $4, $5, $6, $7)`,
        [uuid, title, year, director, duration, poster, rate]
      );

      const result = await client.query(
        'SELECT id, title, year, director, duration, poster, rate FROM movie WHERE id = $1;',
        [uuid]
      );

      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async delete({ id }) {
    const client = await pool.connect();
    try {
      // Verificar si la película existe antes de eliminarla
      const result = await client.query('SELECT id FROM movie WHERE id = $1;', [id]);
      if (result.rows.length === 0) {
        return { message: `Película con id ${id} no encontrada.` };
      }

      await client.query('DELETE FROM movie WHERE id = $1;', [id]);
      return { message: `Película con id ${id} eliminada.` };
    } finally {
      client.release();
    }
  }

  static async update({ id, input }) {
    const { title, year, director, duration, poster, rate } = input;
    const client = await pool.connect();
    try {
      // Verificar si la película existe antes de actualizarla
      const result = await client.query('SELECT id FROM movie WHERE id = $1;', [id]);
      if (result.rows.length === 0) {
        return { message: `Película con id ${id} no encontrada.` };
      }

      await client.query(
        `UPDATE movie SET 
          title = $1,
          year = $2,
          director = $3,
          duration = $4,
          poster = $5,
          rate = $6
         WHERE id = $7`,
        [title, year, director, duration, poster, rate, id]
      );

      const updatedResult = await client.query(
        'SELECT id, title, year, director, duration, poster, rate FROM movie WHERE id = $1;',
        [id]
      );

      return updatedResult.rows[0];
    } finally {
      client.release();
    }
  }
}
