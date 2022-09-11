import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
const Pdftron = (props) => {
    console.log(props, "propssssssssssssssssssssss search");
    const [Con, setCon] = useState(false)
    const viewer = useRef(null);
    const instance1 = useRef(null);
    useEffect(() => {
        WebViewer(
            {
                path: '/webviewer/lib',
            },
            viewer.current,
        ).then((instance) => {
            instance1.current = instance
            setCon(true)
        });
    }, [])

    useEffect(() => {

        if (instance1.current) {
            const { documentViewer, annotationManager, Annotations, Search, setFitMode } = instance1.current.Core;
            
            instance1.current.loadDocument(props?.document, { filename: 'myfile.pdf' });

            const { FitMode } = instance1.current.UI;

            let annotation = null
            let annotationPromises = [];
            
            const highlightText = () => {
                let coordinate = [];
                let coords = {};

                props?.highlightText?.forEach(async element => {
                    coords = {
                        x1: element?.left,
                        x2: element?.left + element?.width,
                        x3: element?.left + element?.width,
                        x4: element?.left,
                        y1: element?.top + element?.height,
                        y2: element?.top + element?.height,
                        y3: element?.top,
                        y4: element?.top
                    };
                    await coordinate.push(coords)
                });
                annotation = new Annotations.TextHighlightAnnotation();
                annotation.Quads = (coordinate[0]?.x1) ? coordinate : [{ x1: 0, x2: 0, x3: 0, x4: 0, y1: 0, y2: 0, y3: 0, y4: 0 }];
                annotation.StrokeColor = new Annotations.Color(253, 255, 50);
                annotationPromises = [annotation];
                annotationManager.addAnnotation(annotationPromises);
            };
            
            documentViewer.addEventListener('documentLoaded', async () => {
                await highlightText();
                instance1.current.UI.setFitMode(FitMode.FitWidth);
            });
            props?.rectCords?.forEach(async element => {
            documentViewer.addEventListener('documentLoaded', () => {
                const rectangleAnnot = new Annotations.RectangleAnnotation();
                    rectangleAnnot.X = element.left;
                    rectangleAnnot.Y = element.top;
                    rectangleAnnot.Width = element.right-element.left;
                    rectangleAnnot.Height = element.bottom-element.top;
                    rectangleAnnot.Author = annotationManager.getCurrentUser();
                    
                    annotationManager.addAnnotation(rectangleAnnot);
                    // need to draw the annotation otherwise it won't show up until the page is refreshed
                    annotationManager.redrawAnnotation(rectangleAnnot);
                })
            });
        }
    }, [props.document, props.highlightText, Con])
    
    return (
        <div className="App w-100">
            <div className="webviewer" ref={viewer}></div>
        </div>
    );
};

export default Pdftron;
