import {authenticate} from '@loopback/authentication';
import {OPERATION_SECURITY_SPEC} from '@loopback/authentication-jwt';
import {get, HttpErrors, param} from '@loopback/rest';
import * as solanaWeb3 from '@solana/web3.js';


export class CheckerController {
  constructor() { }

  @authenticate("jwt")
  @get('/check/{chain}/{address}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Check delegation',
        content: {
          'application/json': {
            schema: {},
          },
        },
      },
    },
  })
  async checkDelegation(
    @param.path.string('chain') chain: string,
    @param.path.string('address') address: string,
  ): Promise<any> {
    switch (chain) {
      case "solana":
        let pubkey;
        try {
          pubkey = new solanaWeb3.PublicKey(address);
        } catch (error) {
          throw new HttpErrors.BadRequest("Invalid address");
        }
        const url = solanaWeb3.clusterApiUrl("mainnet-beta").replace("api", "explorer-api");
        const connection = new solanaWeb3.Connection(url, "confirmed");
        const result = (await connection.getParsedAccountInfo(pubkey)).value;
        return result;

      default:
        throw new HttpErrors.BadRequest("Unsupported chain");
    }
  }
}