import React, { useState } from 'react';
import { Button, Popup, Image } from '@chatui/core';

export default function () {
    const [open, setOpen] = useState(false);

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <div>
            <Button onClick={handleOpen}>Open</Button>
            <Popup
                active={open}
                title="标题"
                onClose={handleClose}
            >
                <div style={{padding:'0px 15px'}}>
                    <p style={{padding:'10px'}}>内容详情内容详情内容详情内容详情内容详情内容详情</p>
                    <Image src="//img.alicdn.com/tfs/TB1e9m8p5_1gK0jSZFqXXcpaXXa-1024-683.jpg" alt="Responsive image" fluid />
                    <p style={{padding:'10px'}}>内容详情内容详情内容详情内容详情内容详情</p>
                </div>
            </Popup>
        </div>
    );
}
