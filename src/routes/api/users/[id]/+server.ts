// /api/users/[id]/+server.ts
import { json } from '@sveltejs/kit';
import { userService } from '$lib/server/services/user.service';

import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
    const id = params.id;
    if (!id) {
        return json({ error: 'Missing user id' }, { status: 400 });
    }
    const user = await userService.getUserById(id);
    if (!user) {
        return json({ error: 'User not found' }, { status: 404 });
    }
    return json({ user });
};