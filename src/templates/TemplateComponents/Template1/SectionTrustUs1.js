import React, { useState, useRef, useEffect } from 'react';
import EditableText from '../../../components/logiciel/TemplateComponent/EditableText';
import ImageSlots from '../../../components/logiciel/TemplateComponent/ImageSlots';
import { useStyle } from '../../../hooks/StyleContext';
import { useImageHistory } from '../../../hooks/ImageHistoryContext';



const SectionTrustUs1 = ({ isPreviewMode, setSelectedElement }) => {
    const { imageHistory } = useImageHistory();


    
const styles = {
    trustSection: {
        backgroundColor: '#fff',
        padding: '50px 20px',
        textAlign: 'center',
    },
    trustHeading: {
        fontSize: '2rem',
        color: '#333',
        marginBottom: '1rem',
    },
    trustText: {
        fontSize: '1rem',
        color: '#666',
        marginBottom: '2rem',
    },
    trustPoints: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
    },
    trustPoint: {
        width: '200px',
        textAlign: 'left',
    },
    icon: {
        height: '50px',
        marginBottom: '10px',
    },
    button: {
        fontSize: '1rem',
        padding: '10px 20px',
        backgroundColor: '#0066ff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    imagesTrust: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
    },
    imageGroup: {
        display: 'flex',
        gap: '20px',
    },
    imageStyles1: {
        width: '288px',
        height: '245px',
    },
    imageStyles2: {
        width: '154px',
        height: '205px',
    },
    imageStyles3: {
        width: '244px',
        height: '186px',
    }
};        // Define initial state based on sessionStorage or default values
    const initialState = JSON.parse(sessionStorage.getItem('trustContent')) || {
        heading: 'Why our clients trust us',
        text: 'Lorem ipsum dolor sit amet consectetur, Ducimus, aliquet vel, sequi odit commodi qui non sed.',
        trustPoints: [
            'Lorem ipsum dolor sit amet consectetur. Elementum nisi quis eleifend quam.',
            'Lorem ipsum dolor sit amet consectetur. Elementum nisi quis eleifend quam.',
            'Lorem ipsum dolor sit amet consectetur. Elementum nisi quis eleifend quam.',
            'Lorem ipsum dolor sit amet consectetur. Elementum nisi quis eleifend quam.',
        ],
        // Add a default images array setup
        images: [
            { src: "https://via.placeholder.com/288x245", alt: "Placeholder", style: styles.imageStyles1 },
            { src: "https://via.placeholder.com/154x205", alt: "Placeholder", style: styles.imageStyles2 },
            { src: "https://via.placeholder.com/244x186", alt: "Placeholder", style: styles.imageStyles3 }
        ],
    };
const { style } = useStyle();

    const [content, setContent] = useState(initialState);
    const trustPointRefs = useRef([]);
    // Update sessionStorage whenever content changes
    useEffect(() => {
        sessionStorage.setItem('trustContent', JSON.stringify(content));
        
    }, [content]);
    useEffect(() => {
        // Adjust refs array to match the length of trustPoints
        trustPointRefs.current = content.trustPoints.map((_, i) => 
            trustPointRefs.current[i] ?? React.createRef()
        );
    }, [content.trustPoints.length]);
    
    const handleContentChange = (key, index, newValue) => {
        setContent(prevContent => {
            const updatedContent = { ...prevContent };
            if (key === 'trustPoints') {
                updatedContent.trustPoints[index] = newValue;
            } else {
                updatedContent[key] = newValue;
            }
            return updatedContent;
        });
    };

// Adapted handleTextClick for trust points
const handleTextClick = (index) => {
    if (!isPreviewMode && typeof setSelectedElement === 'function') {
        const elementRef = trustPointRefs.current[index];
        if (elementRef && elementRef.current) {
            setSelectedElement(elementRef.current);
        } else {
            console.error('Ref not found for index:', index);
        }
    }
};


    return (
        <div className='trust-section-1'>
            <section style={styles.trustSection} className='trust-content'>
                <EditableText
                    isEditable={true}
                    tagName="h2"
                    content={content.heading}
                    onContentChange={(newValue) => handleContentChange('heading', newValue)}
                    style={styles.trustHeading}
                />
                <EditableText
                    isEditable={true}
                    tagName="p"
                    content={content.text}
                    onContentChange={(newValue) => handleContentChange('text', newValue)}
                    style={styles.trustText}
                />
                <div className='trust-body'>
                    <div className='images-trust' style={styles.imagesTrust}>
                        <div style={styles.imageGroup}>
                            {content.images.slice(0, 2).map((img, index) => (
                                <ImageSlots
                                    key={index}
                                    styles={img.style}
                                    imageHistory={imageHistory}
                                    initialImage={img.src}
                                />
                            ))}
                        </div>
                        <ImageSlots
                            styles={content.images[2].style}
                            imageHistory={imageHistory}
                            initialImage={content.images[2].src}
                        />
                    </div>
                    <div style={styles.trustPoints} className='trust-points'>
                {content.trustPoints.map((point, index) => (
                    <div key={index} style={styles.trustPoint} className='trust-point'>
                        <img style={styles.icon} src={`https://via.placeholder.com/50x50?text=TP${index + 1}`} alt={`Trust Point ${index + 1}`} />
                        <EditableText
                            isEditable={!isPreviewMode}
                            tagName="p"
                            content={point}
                            onContentChange={(newValue) => handleContentChange('trustPoints', index, newValue)}
                            innerRef={trustPointRefs.current[index]}
                            onClick={() => handleTextClick(index)} // Pass the index of the clicked item
                        />
                    </div>
                ))}
                        <button style={styles.button}>Button</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SectionTrustUs1;
