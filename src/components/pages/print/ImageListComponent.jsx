import React from 'react';
import ImageCard from "./ImageCard";
import {Box, ImageList, Skeleton, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import Fade from 'react-reveal/Fade';

const ImageListComponent = ({user, filesInitial, handleOpenModal}) => {
    const loader = useSelector(state => state.files.files)

    return (
        <ImageList
            gap={12}
            sx={{
                mt: 2,
                gridTemplateColumns:
                    'repeat(auto-fill, minmax(220px, 1fr)) !important'
            }}
        >
            {loader.length > 0 &&
                loader.map(progress =>
                    <Fade key={progress.id}>
                    <Box  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 220}}>
                        <Skeleton className={'print__image-cart-skeleton'} variant="rounded" width={'100%'} height={'100%'}
                                  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
                        <CircularProgress variant="determinate" value={progress.progress} />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography variant="caption" component="div" color="text.secondary">
                                {`${Math.round(progress.progress)}%`}
                            </Typography>
                        </Box>
                        </Skeleton>
                    </Box>
                    </Fade>
                )

            }

            {filesInitial?.map((item) => (
                <ImageCard key={item.id} user={user} item={item} handleOpenModal={handleOpenModal}/>
            ))}
        </ImageList>
    );
};

export default ImageListComponent;