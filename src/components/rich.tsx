import React from 'react';
import { RichText } from '@chatui/core';

export default function Rich(data: any,ctx: any,meta: any) {
    const html = `<div>${data.data}</div>`;
    return <RichText content={html} />;
}
