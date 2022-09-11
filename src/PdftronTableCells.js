import React, { useRef, useEffect, useState } from "react";
import WebViewer from "@pdftron/webviewer";
const PdftronTableCells = (props) => {
  const [Con, setCon] = useState(false);
  const viewer = useRef(null);
  const instance1 = useRef(null);
  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
      },
      viewer.current
    ).then((instance) => {
      instance1.current = instance;
      setCon(true);
    });
  }, []);

  useEffect(() => {
    if (instance1.current) {
      const {
        documentViewer,
        annotationManager,
        Annotations,
        Search,
        setFitMode,
      } = instance1.current.Core;

      instance1.current.loadDocument(props?.document, {
        filename: "myfile.pdf",
      });

      const { FitMode } = instance1.current.UI;

      const highlightText = () => {
        let coordinate = [];
        let coords = {};
        let annotation = null;
        let annotationPromises = [];
        props?.highlightText?.forEach(async (element) => {
          coords = {
            x1: element?.[0],
            x2: element?.[0] + (element?.[2] - element?.[0]),
            x3: element?.[0] + (element?.[2] - element?.[0]),
            x4: element?.[0],
            y1: element?.[1] + (element?.[3] - element?.[1]),
            y2: element?.[1] + (element?.[3] - element?.[1]),
            y3: element?.[1],
            y4: element?.[1],
          };
          await coordinate.push(coords);
        });
        annotation = new Annotations.TextHighlightAnnotation();
        annotation.Quads = coordinate[0]?.x1
          ? coordinate
          : [{ x1: 0, x2: 0, x3: 0, x4: 0, y1: 0, y2: 0, y3: 0, y4: 0 }];
        annotation.StrokeColor = new Annotations.Color(253, 255, 50);
        annotationPromises = [annotation];
        annotationManager.addAnnotation(annotationPromises);
      };

      const highlightTextMagenta = () => {
        let coordinate = [];
        let coords = {  x1: props?.highlightTextMag?.[0],
                x2: props?.highlightTextMag?.[0] + (props?.highlightTextMag?.[2] - props?.highlightTextMag?.[0]),
                x3: props?.highlightTextMag?.[0] + (props?.highlightTextMag?.[2] - props?.highlightTextMag?.[0]),
                x4: props?.highlightTextMag?.[0],
                y1: props?.highlightTextMag?.[1] + (props?.highlightTextMag?.[3] - props?.highlightTextMag?.[1]),
                y2: props?.highlightTextMag?.[1] + (props?.highlightTextMag?.[3] - props?.highlightTextMag?.[1]),
                y3: props?.highlightTextMag?.[1],
                y4: props?.highlightTextMag?.[1],
        };
        let annotation = null;
        let annotationPromises = [];
       
           coordinate.push(coords);
      
        annotation = new Annotations.TextHighlightAnnotation();
        annotation.Quads = coordinate[0]?.x1
          ? coordinate
          : [{ x1: 0, x2: 0, x3: 0, x4: 0, y1: 0, y2: 0, y3: 0, y4: 0 }];
          
        annotation.StrokeColor = new Annotations.Color(0,231,21);
        annotationPromises = [annotation];
        annotationManager.addAnnotation(annotationPromises);
        console.log( coordinate,"1mouse pointerrrrrrrrrrrrrrrrr____________---");

      }

      documentViewer.addEventListener("documentLoaded", async () => {
        await highlightText();
        await highlightTextMagenta();
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
                // console.log( props?.highlightText,"mouse pointerrrrrrrrrrrrrrrrr____________---");

            })
            // documentViewer.addEventListener('mouseLeave', () => {
            //   const annots = annotationManager.getAnnotationsList();
            //   console.log(annots);
            //   // annotationManager.deleteAnnotations(annots);
            //   })
            //   documentViewer.addEventListener('mouseMove', (e) => {
            //     var x = e.clientX;

            //     var y = e.clientY;
            //       // console.log("x: ", x, " , Y: ", y , "mouse pointerrrrrrrrrrrrrrrrr____________---")
            //     })
        });
    }
  }, [props.document, props.highlightText, Con]);

//   function coordinate(event) {
 
//     // clientX gives horizontal coordinate
//     var x = event.clientX;

//     // clientY gives vertical coordinates
//     var y = event.clientY;
//       console.log("x: ", x, " , Y: ", y , "mouse pointerrrrrrrrrrrrrrrrr")
//  }

  return (
    <div className="App w-100"  >
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default PdftronTableCells;