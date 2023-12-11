import { useAccount, useConnect, useContractRead } from 'wagmi';
import type { Address } from 'wagmi';

import {Button} from '@mui/material'
import { contractConfig } from './contract';

import { useIsMounted } from '../hooks';

const GetAlive = () => {
    const { data, isRefetching, isSuccess, refetch } = useContractRead({
        ...contractConfig,
        functionName: 'getAlive',
    })

    return (
        <div>
        Is wagmigotchi alive?: {isSuccess && <span>{data ? 'yes' : 'no'}</span>}
        <button
            disabled={isRefetching}
            onClick={() => refetch()}
            style={{ marginLeft: 4 }}
            type='button'
        >
            {isRefetching ? 'loading...' : 'refetch'}
        </button>
        </div>
    )
}

export const Connect = () => {
    const isMounted = useIsMounted()
    const { connector, isReconnecting, address } = useAccount()
    const { connect, connectors, isLoading, error, pendingConnector } =
        useConnect({
            chainId: 43114
        });

    if (address) {
        return <Button 
            variant='contained'
            sx={{
                fontWeight: 600,
                fontSize: 15,
                borderRadius: '10px',
                textTransform: 'none'
            }}
            disabled>
                {address}
        </Button>
    }

    return (
        <div>
        <div>
            {connectors.map((x) => {
            return <Button
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