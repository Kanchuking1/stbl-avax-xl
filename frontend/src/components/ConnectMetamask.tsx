import { useAccount, useConnect, useEnsName } from 'wagmi'

import {Button, Paper} from '@mui/material'

import { useIsMounted } from '../hooks'

export const Connect = () => {
  const isMounted = useIsMounted()
  const { connector, isReconnecting, address } = useAccount()
  const { connect, connectors, isLoading, error, pendingConnector } =
    useConnect({
        chainId: 43114
    })

    const ensName = useEnsName();

    console.log(ensName);

  return (
    <div>
      <div>
        {connectors.map((x) => {
          return (connector?.id === x.id)?<Paper>
            {address}
          </Paper> :<Button
            variant='contained'
            disabled={!x.ready || isReconnecting }
            key={x.name}
            sx={{
                fontWeight: 600,
                fontSize: 15,
                borderRadius: '10px',
                textTransform: 'none'
                }}
            onClick={() => connect({ connector: x })}
          >
            Connect {x.id === 'injected' ? (isMounted ? x.name : x.id) : x.name}
            {isMounted && !x.ready && ' (unsupported)'}
            {isLoading && x.id === pendingConnector?.id && '…'}
          </Button>
        })}
      </div>
    </div>
  )
}