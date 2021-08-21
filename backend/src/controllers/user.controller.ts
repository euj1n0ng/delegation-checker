import {repository} from '@loopback/repository';
import {getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories';


export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User, {exclude: ['password']})
          }
        }
      }
    }
  })
  async signup(@requestBody() userData: User) {
    const savedUser = await this.userRepository.create(userData);
    // @ts-ignore
    delete savedUser.password;
    return savedUser;
  }

  @post('/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  })
  async login(
    @requestBody() credentials: Credentials,
  ): Promise<{token: string}> {
    return Promise.resolve({token: 'token'})
  }
}