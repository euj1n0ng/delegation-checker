import {authenticate} from '@loopback/authentication';
import {OPERATION_SECURITY_SPEC} from '@loopback/authentication-jwt';
import {get, HttpErrors, param} from '@loopback/rest';
import * as solanaWeb3 from '@solana/web3.js';
import axios from 'axios';


export class CheckerController {
  constructor() { }

  @authenticate('jwt')
  @get('/check/{chain}/{address}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Check delegation',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                voter: {
                  type: 'string'
                },
                stake: {
                  type: 'string'
                }
              }
            },
          },
        },
      },
    },
  })
  async checkDelegation(
    @param.path.string('chain') chain: string,
    @param.path.string('address') address: string,
  ): Promise<{voter: string, stake: string}> {
    let resp;
    switch (chain) {
      case 'solana':
        let pubkey;
        try {
          pubkey = new solanaWeb3.PublicKey(address);
        } catch (error) {
          throw new HttpErrors.BadRequest('Invalid address');
        }
        const url = solanaWeb3.clusterApiUrl('mainnet-beta').replace('api', 'explorer-api');
        const connection = new solanaWeb3.Connection(url, 'confirmed');
        resp = (await connection.getParsedAccountInfo(pubkey)).value;
        // @ts-ignore
        if (resp.data.program !== 'stake' || resp.data.parsed.type !== 'delegated') {
          throw new HttpErrors.BadRequest('Not a delegator')
        }
        return {
          //@ts-ignore
          voter: `https://solanabeach.io/validator/${resp.data.parsed.info.stake.delegation.voter}`,
          //@ts-ignore
          stake: `${resp.data.parsed.info.stake.delegation.stake / Math.pow(10, 9)} SOL`,
        };

      case 'polygon':
        resp = (await axios({url: `https://sentinel.matic.network/api/v2/delegators/${address}`})).data;
        if (!resp.success) {
          throw new HttpErrors.BadRequest('Invalid address');
        }
        // @ts-ignore
        if (resp.result.length === 0) {
          throw new HttpErrors.BadRequest('Not a delegator')
        }
        return {
          //@ts-ignore
          voter: `https://wallet.matic.network/staking/validators/${resp.result[0].bondedValidator}`,
          //@ts-ignore
          stake: `${Math.round(resp.result[0].stake * Math.pow(10, -15)) / Math.pow(10, 3)} MATIC`,
        };

      default:
        throw new HttpErrors.BadRequest('Unsupported chain');
    }
  }
}