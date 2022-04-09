import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import * as Yup from "yup";
import {useFormik} from "formik";
import axios from "../../../utils/request";
import _ from 'lodash';

import {
    Alert as MuiAlert,
    Button,
    FormControl,
    FormHelperText,
    Link,
    MenuItem,
    Select,
    TextField as MuiTextField
} from "@mui/material";
import { spacing } from "@mui/system";
import MessageTemplateComponent from "@/pages/config/notify/MessageTemplateComponent";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);
const Centered = styled.div`
  text-align: center;
`;

function PushDeerConfigComponent({ isInit, data, onSubmitEvent, users, onTestEvent }) {
    const navigate = useNavigate();
    const [opType, setOpType] = useState('save')
    const [message, setMessage] = useState();
    const [messageTemplate, setMessageTemplate] = useState({
        movie_completed: {
            title: '${name} (${year}) 评分:${rating}', message: '${nickname}添加的电影 ${name}(${year})下载完毕'
        }, 'tv_completed': {
            title: '${name} (${year}) 评分:${rating}', message: '${nickname}添加的剧集 ${name}(${year})第${episodes}集下载完毕'
        }
    })
    const formik = useFormik({
        initialValues: {
            api: 'https://api2.pushdeer.com/message/push',
            pushkey: '',
            pushkeys: [],
            message_template: 'movie_completed',
            title: '${name} (${year}) 评分:${rating}',
            message: '${nickname}添加的电影 ${name}(${year})下载完毕'
        }, validationSchema: Yup.object().shape({
            api: Yup.string().max(1000).required(),
            pushkey: Yup.string().max(500).required(),
            pushkeys: Yup.array(),
            title: Yup.string().max(1000).required(),
            message: Yup.string().max(1000).required(),
        }), onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
                setMessage(undefined)
                setSubmitting(true)
                let params = { ...values }
                params['message_template'] = messageTemplate;
                delete params['title']
                delete params['message']
                if (opType === "save") {
                    await onSubmitEvent(params, setMessage)
                } else if (opType === "test") {
                    await onTestEvent(params, setMessage)
                }
            } catch (error) {
                const message = error.message || "PushDeer配置出错啦";
                setStatus({ success: false });
                setErrors({ submit: message });
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(async () => {
        if (data !== undefined && data !== null) {
            formik.setFieldValue('api', data.api)
            formik.setFieldValue('pushkey', data.pushkey)
            const { title, message } = _.get(data, `message_template.${_.get(formik, 'values.message_template', '')}`, { title: '', message: '' })
            formik.setFieldValue('title', title)
            formik.setFieldValue('message', message)
            if (users && users.length > 0) {
                formik.setFieldValue('pushkeys', _.map(users, item => {
                    const exist = _.find(data.pushkeys, { nickname: item.nickname })
                    return {
                        pushkey: exist ? exist.pushkey : '',
                        nickname: item.nickname
                    }
                }))
            }
            setMessageTemplate(data.message_template)
        }
    }, [data, users]);
    return (<form noValidate onSubmit={formik.handleSubmit}>
        {formik.errors.submit && (<Alert mt={2} mb={1} severity="warning">
            {formik.errors.submit}
        </Alert>)}
        {message && (<Alert severity="success" my={3}>
            {message}
        </Alert>)}
        <TextField
            type="text"
            name="api"
            {...formik.getFieldProps('api')}
            label="推送API地址"
            fullWidth
            helperText={'pushdeer的api地址，默认是官方，可以改为自建'}
            my={3}
        />
        <TextField
            type="text"
            name="pushkey"
            label="pushkey"
            {...formik.getFieldProps('pushkey')}
            fullWidth
            helperText={'推送接口的pushkey'}
            my={3}
        />
        <MessageTemplateComponent formik={formik} messageTemplate={messageTemplate}
            setMessageTemplate={setMessageTemplate} />

        {formik.values.pushkeys && formik.values.pushkeys.length ? formik.values.pushkeys.map((user, index) => <TextField
            type="text"
            key={index}
            name={`pushkeys[${index}].pushkey`}
            {...formik.getFieldProps(`pushkeys[${index}].pushkey`)}
            label={`${user.nickname} 的 pushkey`}
            fullWidth
            helperText={`用来给 ${user.nickname} 独立推送`}
            my={3}
        />) : ''}
        <Centered>
            <Button sx={{ mr: 2 }}
                size="medium"
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => setOpType('test')}
                disabled={formik.isSubmitting}
            >
                推送一条消息测试
            </Button>
            <Button
                mr={2}
                size="medium"
                type="submit"
                variant="contained"
                color="primary"
                disabled={formik.isSubmitting}
                onClick={() => setOpType('save')}
            >
                保存设置
            </Button>
        </Centered>

    </form>);
}

export default PushDeerConfigComponent;
