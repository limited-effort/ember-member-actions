import { v4 } from 'uuid';

export default function () {
  this.get('/animals');
  this.get('/animals/:id');

  this.post('animals/:id/regenerate', (schema, request) => {
    let model = schema.animals.find(request.params.id);
    model.update({ uuid: v4() });
    return model;
  });

  this.get('animals/:id/:method', (schema, request) => {
    let model = schema.animals.find(request.params.id);
    return model;
  });

  this.post('animals/:id/:method', (schema, request) => {
    let model = schema.animals.find(request.params.id);
    return model;
  });

  this.put('animals/:id/:method', (schema, request) => {
    let model = schema.animals.find(request.params.id);
    return model;
  });

  this.patch('animals/:id/:method', (schema, request) => {
    let model = schema.animals.find(request.params.id);
    return model;
  });
}
