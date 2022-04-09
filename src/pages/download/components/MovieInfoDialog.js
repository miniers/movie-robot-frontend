import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";

import {Info as InfoIcon} from '@mui/icons-material';
import {getRecord, getTorrentInfo} from "@/utils/download_record";

function InfoList({data}) {
    return (
        <List dense>
            <ListItem>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography>内容类型：</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <ListItemText>{data?.record.movie_type==="Movie"?"电影":"剧集"}</ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
            <ListItem>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography>来自站点：</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <ListItemText>{data?.record.site_name==="unknown"?"未知":data?.record.site_name}</ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
            <ListItem>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography>种子名称：</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <ListItemText>{data?.torrent_info.name}</ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
            <ListItem>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography>保存路径：</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <ListItemText>{data?.torrent_info.save_path}</ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
            <ListItem>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography>内容路径：</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <ListItemText>{data?.torrent_info.content_path}</ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
            <ListItem>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography>链接路径：</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <ListItemText>{data?.record.link_path}</ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
            <ListItem>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography>文件尺寸：</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <ListItemText>{data?.torrent_info.size_str}</ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
            <ListItem>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography>已经上传：</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <ListItemText>{data?.torrent_info.uploaded_str}</ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
            <ListItem>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography>做种时间：</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <ListItemText>{data?.torrent_info.seeding_time_str}</ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
        </List>
    );
}

export default function MovieInfoDialog({id}) {
    const [open, setOpen] = React.useState(false);
    const [data, setDate] = React.useState({})
    const handleClickOpen = async () => {
        let result = await getRecord(id)
        setDate(result.data)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen} aria-label="种子信息" size="small">
                <InfoIcon/>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll='paper'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                sx={{minWidth: '600'}}
            >
                <DialogTitle id="scroll-dialog-title">种子信息</DialogTitle>
                <DialogContent dividers sx={{padding: 0}}>
                    <InfoList data={data}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>关闭</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}
