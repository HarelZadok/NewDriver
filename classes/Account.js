import {get, getDatabase, ref} from "firebase/database";

export class Account
{
    constructor(id, firstName, lastName, phone, email, password)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }
}

export class Driver extends Account
{
    constructor(id, firstName, lastName, phone, email, password, licenceNumber, licenceIssueDate)
    {
        super(id, firstName, lastName, phone, email, password);
        this.licenceNumber = licenceNumber;
        this.licenceIssueDate = licenceIssueDate;
        this.type = 'driver';
    }
}

export class Passenger extends Account
{
    constructor(id, firstName, lastName, phone, email, password, licenceNumber, licenceIssueDate)
    {
        super(id, firstName, lastName, phone, email, password);
        this.licenceNumber = licenceNumber;
        this.licenceIssueDate = licenceIssueDate;
        this.type = 'passenger';
    }
}

export async function getTypeById(id) : Promise<string>
{
    const db = getDatabase();

    let type = 'null'

    let snapshot = await get(ref(db, `users/drivers/${id}`));

    if (snapshot.exists())
        type = 'driver';
    else
    {
        snapshot = await get(ref(db, `users/passengers/${id}`));
        if (snapshot.exists())
            type = 'passenger';
    }

    return new Promise((resolve) => {resolve(type)});
}