import React from 'react'
import { ProfilerOnRenderCallback, ProfilerProps } from 'react'

type Props = {
    id: string;
    metadata?: any;
    phases?: ('mount' | 'update')[]
} & Omit<ProfilerProps, 'onRender'>;

let queue: unknown[] = []
const sendProfileQueue = () => {
    
    if (!queue.length) return
    const queueToSend = [...queue]
    queue = []
    console.log('查看相关数据');
    console.log(queueToSend)
}

setInterval(sendProfileQueue, 1000)

export const Profiler = ({ metadata, phases, ...props }: Props) => {
    const reportProfile: ProfilerOnRenderCallback = (
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
    ) => {
        if (!phases || phases.includes(phase)) {
            queue.push({
                id,
                phase,
                actualDuration,
                baseDuration,
                startTime,
                commitTime,
                interactions,
                metadata
            })
        }
    }
    return <React.Profiler onRender={reportProfile} {...props} />
}