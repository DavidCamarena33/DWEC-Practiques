import connection from './db.service.js'
import bcrypt from 'bcrypt'


export const [QGetAllUsers] = await connection.query(
        'SELECT name, role FROM users'
        );


export async function QInsertUser(name, password, role){
 
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const [results] = await connection.query(
            'INSERT INTO users(name, password, role) VALUES(?, ?, ?)',
            [name, hashedPassword, role]
        );

    return results;
}

export async function QloginVerify(name, password){
    const [login] = await connection.query(
                'select role, password from users where name = ?',
                [name]
            );

    return login;
}

