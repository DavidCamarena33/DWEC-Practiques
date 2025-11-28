import connection from '../services/db.service.js'
import bcrypt from 'bcrypt'


export async function QGetAllUsers(){
    const [results] = await connection.query(
        'SELECT name, role FROM users'
        );

    return results;
} 


export async function QInsertUser(name, password, role){
 
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const [results] = await connection.query(
            'INSERT INTO users(name, password, role) VALUES(?, ?, ?)',
            [name, hashedPassword, role]
        );

    return results;
}

export async function QloginVerify(name){
    const [login] = await connection.query(
                'select role, password from users where name = ?',
                [name]
            );

    return login;
}

