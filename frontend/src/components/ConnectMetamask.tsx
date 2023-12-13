import { useAccount, useConnect, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

import {Button} from '@mui/material'
import { contractConfig } from './contract';

import { useIsMounted } from '../hooks';
import React from 'react';

const GenerateImage = () => {
    const { config } = usePrepareContractWrite({
        ...contractConfig,
        functionName: 'generateImage',
        args: ['A proper English breakfast'],
        value: 10000000000000000n
    })
    const { data, write } = useContractWrite(config);
    
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    return (
        <div>
            <Button disabled={isLoading || !write} onClick={() => write && write()}>
                Generate Image
            </Button>
            {isSuccess && (
                <div>
                Successfully generated image!
                </div>
            )}
        </div>
    )
}

export const Connect = () => {
    const isMounted = useIsMounted()
    const { connector, isReconnecting, address } = useAccount()
    const { connect, connectors, isLoading, error, pendingConnector } =
        useConnect({
            chainId: 43112
        });

    if (error) {
        console.log(error);
    }

    if (address) {
        return <React.Fragment>    
            <Button 
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
            <GenerateImage />
        </React.Fragment>
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
                onClick={() => connect({ chainId: 43112, connector: x })}
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