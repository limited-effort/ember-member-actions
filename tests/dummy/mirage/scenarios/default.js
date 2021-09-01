export default function (server) {
  server.create('animal', {
    name: 'pepper',
    type: 'dog',
    uuid: 'ab7dad2e-4f15-47c7-8e7b-2052b0966012',
  });

  server.create('animal', {
    name: 'pockets',
    type: 'dog',
    uuid: '244cd2fd-7eb1-4019-8832-d82e0cd16e73',
  });

  server.create('animal', {
    name: 'patches',
    type: 'cat',
    uuid: 'c6855b41-cc1f-477c-a86a-0ffe1ec31c23',
  });
}
