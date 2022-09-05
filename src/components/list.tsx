import React from 'react';
import {List, ListItem} from '@chatui/core';
import '@/styles/list.css'

export default function (props: any) {
    const data = props.data;
    const ctx = props.ctx

    return (
        <List bordered={true}>
            {data.map((item: any) => (
                <ListItem content={item.title} className={ "lic" }
                          onClick={() => ctx.postMessage({type: 'text', content: {text: item.title}})}>
                </ListItem>
            ))}
        </List>
    );
}
