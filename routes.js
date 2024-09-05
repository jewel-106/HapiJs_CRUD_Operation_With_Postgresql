import db from './db.js';

export default [
    {
        method: 'POST',
        path: '/items',
        handler: async (request, h) => {
            const { name, description } = request.payload;
            const result = await db.one(
                'INSERT INTO items(name, description) VALUES($1, $2) RETURNING id',
                [name, description]
            );
            return h.response({ id: result.id }).code(201);
        }
    },
    {
        method: 'GET',
        path: '/items/{id}',
        handler: async (request, h) => {
            const { id } = request.params;
            const item = await db.oneOrNone('SELECT * FROM items WHERE id = $1', [id]);
            if (!item) {
                return h.response({ error: 'Item not found' }).code(404);
            }
            return item;
        }
    },
    {
        method: 'PUT',
        path: '/items/{id}',
        handler: async (request, h) => {
            const { id } = request.params;
            const { name, description } = request.payload;
            const result = await db.result(
                'UPDATE items SET name = $1, description = $2 WHERE id = $3',
                [name, description, id]
            );
            if (result.rowCount === 0) {
                return h.response({ error: 'Item not found' }).code(404);
            }
            return h.response({ success: true });
        }
    },
    {
        method: 'DELETE',
        path: '/items/{id}',
        handler: async (request, h) => {
            const { id } = request.params;
            const result = await db.result('DELETE FROM items WHERE id = $1', [id]);
            if (result.rowCount === 0) {
                return h.response({ error: 'Item not found' }).code(404);
            }
            return h.response({ success: true });
        }
    },
    {
        method: 'GET',
        path: '/items',
        handler: async (request, h) => {
            const items = await db.any('SELECT * FROM items');
            return items;
        }
    }
];
