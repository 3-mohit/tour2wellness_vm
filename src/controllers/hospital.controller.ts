import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Hospital} from '../models';
import {HospitalRepository} from '../repositories';

export class HospitalController {
  constructor(
    @repository(HospitalRepository)
    public hospitalRepository : HospitalRepository,
  ) {}

  @post('/hospitals')
  @response(200, {
    description: 'Hospital model instance',
    content: {'application/json': {schema: getModelSchemaRef(Hospital)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hospital, {
            title: 'NewHospital',
            exclude: ['id'],
          }),
        },
      },
    })
    hospital: Omit<Hospital, 'id'>,
  ): Promise<Hospital> {
    return this.hospitalRepository.create(hospital);
  }

  @get('/hospitals/count')
  @response(200, {
    description: 'Hospital model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Hospital) where?: Where<Hospital>,
  ): Promise<Count> {
    return this.hospitalRepository.count(where);
  }

  @get('/hospitals')
  @response(200, {
    description: 'Array of Hospital model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Hospital, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Hospital) filter?: Filter<Hospital>,
  ): Promise<Hospital[]> {
    return this.hospitalRepository.find(filter);
  }

  @patch('/hospitals')
  @response(200, {
    description: 'Hospital PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hospital, {partial: true}),
        },
      },
    })
    hospital: Hospital,
    @param.where(Hospital) where?: Where<Hospital>,
  ): Promise<Count> {
    return this.hospitalRepository.updateAll(hospital, where);
  }

  @get('/hospitals/{id}')
  @response(200, {
    description: 'Hospital model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Hospital, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Hospital, {exclude: 'where'}) filter?: FilterExcludingWhere<Hospital>
  ): Promise<Hospital> {
    return this.hospitalRepository.findById(id, filter);
  }

  @patch('/hospitals/{id}')
  @response(204, {
    description: 'Hospital PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hospital, {partial: true}),
        },
      },
    })
    hospital: Hospital,
  ): Promise<void> {
    await this.hospitalRepository.updateById(id, hospital);
  }

  @put('/hospitals/{id}')
  @response(204, {
    description: 'Hospital PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() hospital: Hospital,
  ): Promise<void> {
    await this.hospitalRepository.replaceById(id, hospital);
  }

  @del('/hospitals/{id}')
  @response(204, {
    description: 'Hospital DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.hospitalRepository.deleteById(id);
  }
}
