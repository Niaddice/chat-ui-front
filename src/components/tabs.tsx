import React, {useState} from 'react';
import {Tabs, Tab} from '@chatui/core';
import {List, ListItem} from '@chatui/core';

export default function (data:any, ctx:any, meta:any) {
    const [tabIndex, setTabIndex] = useState(0);
    const [tabIndex2, setTabIndex2] = useState(0);

    function handleTabChange(i: any) {
        setTabIndex(i);
    }

    function handleTabChange2(i: any) {
        setTabIndex2(i);
    }

    return (
        <div>
            <Tabs index={tabIndex} scrollable onChange={handleTabChange}>
                {data.data.map((i: any) => (
                    <Tab label="标签">
                        <List>
                            {i.item.map((k:any) => (
                                <ListItem content={k.text} onClick={() => ctx.postMessage({type: 'text', content: {text: k.text}})}/>
                            ))}
                        </List>
                    </Tab>
                ))}
            </Tabs>

            <Tabs index={tabIndex2} scrollable onChange={handleTabChange2}>
                <Tab label="标签1">
                    <p>内容1</p>
                </Tab>
                <Tab label="标签2">
                    <p>内容2</p>
                </Tab>
                <Tab label="标签3">
                    <p>内容3</p>
                </Tab>
                <Tab label="标签4">
                    <p>内容4</p>
                </Tab>
                <Tab label="标签5">
                    <p>内容5</p>
                </Tab>
                <Tab label="标签6">
                    <p>内容6</p>
                </Tab>
            </Tabs>
        </div>
    );
}
