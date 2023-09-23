import React, { useCallback, useEffect, useState } from 'react';
import { getAllPortfolioFiles } from "../../../api/portfolio";
import { useDispatch, useSelector } from "react-redux";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Box } from "@mui/material";
import { RotatingLines } from "react-loader-spinner";
import Fade from 'react-reveal/Fade';

const PortfolioListComponent = () => {
    const thumbs = useSelector(state => state.portfolio.files)
    const photos = useSelector(state => state.portfolio.files)
    const loader = useSelector(state => state.portfolio.isVisible)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPortfolioFiles())
    }, [])

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    }

    if (loader) {
        return (
            <Box sx={{ position: 'absolute', top: '50%', left: '50%' }} component='div'>
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="2"
                    animationDuration="0.75"
                    width="50"
                    visible={true}
                />
            </Box>
        )
    }

    return (
        <div>
            <Fade>
                <Gallery photos={JSON.parse(JSON.stringify(thumbs))} onClick={openLightbox} />
            </Fade>
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={photos.map(x => ({
                                ...x,
                                source: x.photo,
                                caption: x.title
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
};

export default PortfolioListComponent;