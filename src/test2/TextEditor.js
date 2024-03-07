import React, { useState } from 'react';
import EditableText from './EditableText'; // Adjust the import path according to your file structure
import './EditableText.css'
import { useStyle } from '../components/logiciel/StyleContext'; // Adjust the import path as necessary

const TextEditor = () => {
    const { style } = useStyle();
    const [content, setContent] = useState({
        title: 'Your Landing Page Title',
        subtitle: 'Your Subtitle Here',
        introParagraph: 'This is an editable introductory paragraph providing an overview of what your landing page is about.',
        section1Title: 'Section 1 Title',
        section1Content: 'Content for section 1. This is editable.',
        section2Title: 'Section 2 Title',
        section2Content: 'Content for section 2. This is also editable.',
        // Extend this object with more sections as needed
    });

    const handleContentChange = (key, newValue) => {
        setContent((prevContent) => ({
            ...prevContent,
            [key]: newValue,
        }));
    };

    return (
        <div>
            {/* Hero Section */}
            <section>
                <EditableText
                    tagName="h1"
                    content={content.title}
                    onContentChange={(newValue) => handleContentChange('title', newValue)}
                    style={style.typography} // Apply typography style

                />
                <EditableText
                    tagName="h2"
                    content={content.subtitle}
                    onContentChange={(newValue) => handleContentChange('subtitle', newValue)}
                    style={style.typography} // Apply typography style

                />
                <EditableText
                    tagName="p"
                    content={content.introParagraph}
                    onContentChange={(newValue) => handleContentChange('introParagraph', newValue)}
                    style={style.typography} // Apply typography style

                />
            </section>
            
            {/* Section 1 */}
            <section>
                <EditableText
                    tagName="h2"
                    content={content.section1Title}
                    onContentChange={(newValue) => handleContentChange('section1Title', newValue)}
                />
                <EditableText
                    tagName="p"
                    content={content.section1Content}
                    onContentChange={(newValue) => handleContentChange('section1Content', newValue)}
                />
            </section>
            
            {/* Section 2 */}
            <section>
                <EditableText
                    tagName="h2"
                    content={content.section2Title}
                    onContentChange={(newValue) => handleContentChange('section2Title', newValue)}
                />
                <EditableText
                    tagName="p"
                    content={content.section2Content}
                    onContentChange={(newValue) => handleContentChange('section2Content', newValue)}
                />
            </section>
            
            {/* Add more sections as needed */}
        </div>
    );
};

export default TextEditor;
