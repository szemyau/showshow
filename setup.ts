// async function setupTable<T extends object>(options: {
//   table: string;
//   key: keyof T;
//   samples: T[];
// }) {
//   let table = JSON.stringify(options.table);
//   let key = JSON.stringify(options.key);

//   for (let sample of options.samples) {
//     let result = await client.query(
//       /* sql */
//       `select id from ${table} where ${key} = $1`,
//       [sample[options.key]]
//     );
//     if (result.rowCount == 0) {
//       await client.query(
//         /* sql */ `
//         insert into ${table}
//         (${Object.keys(sample).map((key) => JSON.stringify(key))})
//         values
//         (${Object.keys(sample).map((_, i) => `$${i + 1}`)})
//       `,
//         Object.values(sample)
//       );
//     } else {
//       let values = Object.values(sample);
//       values.push(result.rows[0].id);
//       await client.query(
//         /* sql */ `
//         update ${table}
//         set ${Object.keys(sample).map((key, i) => `${key} = $${i + i}`)}
//         where id = $${values.length}
//         `,
//         values
//       );
//     }
//   }
// }

import { client } from "./database";
// 1. define function: Insert data into database and avoid duplicate data will be inserted into database
async function setupTable<T extends object>(options: {
  table: string;
  keys: (keyof T)[];
  samples: T[];
}) {
  let table = JSON.stringify(options.table);

  for (let sample of options.samples) {
    let result = await client.query(
      /* sql */
      `
      select id from ${table}
      where ${options.keys
        .map((key, i) => `${JSON.stringify(key)} = $${i + 1}`)
        .join(" and ")}
      `,
      options.keys.map((key) => sample[key])
    );
    if (result.rowCount == 0) {
      await client.query(
        /* sql */ `
        insert into ${table}
        (${Object.keys(sample).map((key) => JSON.stringify(key))})
        values
        (${Object.keys(sample).map((_, i) => `$${i + 1}`)})
      `,
        Object.values(sample)
      );
    } else {
      let values = Object.values(sample);
      values.push(result.rows[0].id);
      await client.query(
        /* sql */ `
        update ${table}
        set ${Object.keys(sample).map((key, i) => `${key} = $${i + i}`)}
        where id = $${values.length}
        `,
        values
      );
    }
  }
}

//2. define function: When table use fk refs from other table
async function selectId(options: {
  table: string;
  key: string;
  value: string | number;
}) {
  let table = JSON.stringify(options.table);
  let key = JSON.stringify(options.key);

  let result = await client.query(
    /* sql */
    `select id from ${table} where ${key} = $1`,
    [options.value]
  );
  let id = result.rows[0].id;
  return id;
}

//examples for calling function (w/o fk)

async function setup() {
  await setupTable({
    table: "user",
    keys: ["username"],
    samples: [
      { username: "alice", password: "123" },
      { username: "bob", password: "123" },
    ],
  });

  await setupTable({
    table: "category",
    keys: ["name"],
    samples: [
      { name: "Music", image: "/photo/music.jpg" },
      { name: "Health", image: "/photo/health.jpg" },
    ],
  });

  //examples for calling function (w fk)

  await setupTable({
    table: "user_category",
    keys: ["user_id", "category_id"],
    samples: [
      {
        user_id: await selectId({
          table: "user",
          key: "username",
          value: "alice",
        }),
        category_id: await selectId({
          table: "category",
          key: "name",
          value: "Music",
        }),
      },
      {
        user_id: await selectId({
          table: "user",
          key: "username",
          value: "bob",
        }),
        category_id: await selectId({
          table: "category",
          key: "name",
          value: "Health",
        }),
      },
    ],
  });

  // let categories = [
  //   { name: "Music", image: "/photo/music.jpg" },
  //   { name: "Health", image: "/photo/health.jpg" },
  // ];
  // for (let category of categories) {
  //   let result = await client.query(
  //     /* sql */
  //     `select id from category where name = $1`,
  //     [category.name]
  //   );
  //   if (result.rowCount == 0) {
  //     await client.query(
  //       /* sql */ `
  //       insert into category
  //       (name, image)
  //       values
  //       ($1, $2)
  //     `,
  //       [category.name, category.image]
  //     );
  //   } else {
  //     await client.query(
  //       /* sql */ `
  //       update category
  //       set image = $1
  //       where id = $2
  //       `,
  //       [category.image, result.rows[0].id]
  //     );
  //   }
  // }
}

setup();
