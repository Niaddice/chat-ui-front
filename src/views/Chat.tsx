import React, {useEffect, useRef, useState} from 'react';
import textBubble from "@/components/bubble";
import rich from "@/components/rich";
import {get, post} from '@/utils/axios'
import list from "@/components/list";
import yellowPage from "@/components/tabs";
import card from "@/components/card";
import reactCookie from 'universal-cookie';
import axios from 'axios'
import stepper from "@/components/stepper";

// import { useNavigate } from 'react-router-dom';
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    // console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
    if (ua.match(/MicroMessenger/i)) {
        return true;
    } else {
        return false;
    }
}


const cookies = new reactCookie();

export default function Chat() {
    const wrapper = useRef<HTMLDivElement>(null);
    let [username] = useState('');
    // const navigate = useNavigate();
    username = localStorage.getItem('username') || "";
    if (!username) {
        cookies.remove('token');
    }


    useEffect(() => {
        if (!isWeiXin()) {
            // eslint-disable-next-line no-unused-vars
            const a = get("/api/wechat/heartbeat")
            setInterval(function () {
                // eslint-disable-next-line no-unused-vars
                const a = get("/api/wechat/heartbeat")
                // console.log(a)
            }, 60000)
        }

        // recOpen(function(){
        // });


        username = localStorage.getItem('username') || "";
        if (username) {
            const bot = new window.ChatSDK({
                root: wrapper.current,
                components: {
                    'text-bubble': textBubble,
                    'rich-text': rich,
                    'list-text': list,
                    'tabs-text': yellowPage,
                    'base-card': card,
                    'step-card': stepper,
                },
                config: {
                    // navbar: {
                    //     // logo: 'https://gw.alicdn.com/tfs/TB1Wbldh7L0gK0jSZFxXXXWHVXa-168-33.svg',
                    //     title: 'SWS??????',
                    // },
                    // ???????????????
                    avatarWhiteList: ['knowledge', 'recommend'],
                    // ???????????????
                    robot: {
                        avatar:
                            'https://gw.alicdn.com/tfs/TB1U7FBiAT2gK0jSZPcXXcKkpXa-108-108.jpg',
                    },
                    // ????????????
                    messages: [
                        {
                            type: 'system',
                            content: {
                                text: 'SWS?????????????????????????????????',
                            },
                        },
                        {
                            type: 'text',
                            content: {
                                text: '?????? ' + username + ',??????????????????????????????',
                            },
                        },
                        {
                            type: 'card',
                            content: {
                                code: 'switch-location',
                            },
                        },
                    ],
                    // ????????????
                    quickReplies: [
                        {name: '????????????'},
                    ],
                    // ??????????????????
                    placeholder: '?????????????????????????????????',
                    // toolbar: [
                    //     {
                    //         type: 'image',
                    //         icon: 'image',
                    //         title: '??????',
                    //     },
                    // ],
                },
                //????????????
                requests: {
                    send: function (msg: any) {
                        const data = msg.content;
                        return post("/api/wechat/chat", {type: msg.type, content: data,})
                    // ... ???????????????????????????
                },
                pic: function (msg: any) {
                    console.log(msg)
                }
            }
        }
    )
        ;
        bot.run();
    }

}
,
[]
)
;

// ?????? wrapper ?????????
return <div style={{height: '100%'}} ref={wrapper}/>;
}
