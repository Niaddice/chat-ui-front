import React from 'react';
import {Stepper, Step, ListItem} from '@chatui/core';

export default function (data: any,ctx: any,meta: any) {
    return (
        // <Stepper current={data.current}>
        //     {data.steps.item.map((k:any) => (
        //         <Step title={k.title} desc={k.date} />
        //     ))}
        // </Stepper>
        <Stepper current={2}>
            <Step title="上级领导" desc="2020-08-26 12:00" />
            <Step title="人事节点" desc="2020-08-27 14:00" />
            <Step title="流程结束" desc="2020-08-28 12:30" />
        </Stepper>
    );
}
