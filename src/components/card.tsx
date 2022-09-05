import React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions, Button } from '@chatui/core';

export default function (data: any,ctx: any,meta: any) {
    return (
        <Card size="xs">
            <CardMedia image={data.image} />
            <CardTitle>{data.title}</CardTitle>
            <CardText>{data.text}</CardText>
            <CardActions>
                <Button color="primary" onClick={detail}>详情</Button>
            </CardActions>
        </Card>
    );
}


function detail(id: any){
    window.location.href = `http://192.168.100.102:3000/#/?id=${id}`
}
