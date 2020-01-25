const fs = require('fs');
const crypto = require('crypto');

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repository requires a filename!');
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async getAll() {
    // Open the file called this.filename
    const contents = await fs.promises.readFile(this.filename, {
      encoding: 'utf8'
    });
    // Parse the contents
    const data = JSON.parse(contents);
    // Return the parsed data
    return data;
  }

  async create(attrs) {
    // {email: 'asdasd@asdasd.com', password: 'password'}
    attrs.id = this.randomId();

    const records = await this.getAll();
    records.push(attrs);

    await this.writeAll(records);
  }

  async writeAll(records) {
    // write the updated records array back to this.filename
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  randomId() {
    return crypto.randomBytes(4).toString('hex');
  }

  async getOne(id) {
    const records = await this.getAll();

    return records.find(record => record.id === id);
  }
}

const test = async () => {
  const repo = new UsersRepository('users.json');

  // await repo.create({ email: 'test@test.com', password: 'password' });

  // const users = await repo.getAll();

  const user = await repo.getOne('4bac57e1');

  console.log(user);
};

test();
