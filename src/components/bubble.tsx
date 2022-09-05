import React from 'react';
import { Bubble } from '@chatui/core';

export default function textBubble(data: any,ctx: any,meta: any) {
    console.log(data)
    return (
        <Bubble type="text">
            <a href="#">{data.data}</a>
        </Bubble>);
}
