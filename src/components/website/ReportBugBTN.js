import React, { useState, useRef } from 'react';
import './ReportBugBTN.css'; // Ensure the CSS path is correct
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FaArrowDown } from 'react-icons/fa'; // FontAwesome arrow down
import { db, storage, ref, uploadBytes, getDownloadURL, setDoc, doc, collection } from '../../firebaseConfig';
const Modal = ({ isOpen, handleClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

const ReportBugBTN = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const imageUploadRef = useRef(null);
    const bugDescriptionRef = useRef(null);

    // Handlers
    const handleSubmit = async (event) => {
        event.preventDefault();
        let imageUrl = '';
        const bugDescription = bugDescriptionRef.current ? bugDescriptionRef.current.value : '';

        try {
            if (imagePreviewUrl && imageUploadRef.current?.files.length > 0) {
                const imageFile = imageUploadRef.current.files[0];
                const storageRef = ref(storage, `reportImages/${bugDescription}`);
                const uploadTaskSnapshot = await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(uploadTaskSnapshot.ref);
                setImagePreviewUrl('');
            }
    
            if (bugDescription !== '') {
                await setDoc(doc(collection(db, "reports")), {
                    description: bugDescription,
                    imageUrl: imageUrl,
                    createdAt: new Date()
                });
                alert('Report submitted successfully');
                closeModal();
            } else {
                alert('Please provide a description.');
            }
        } catch (error) {
            console.error("Error adding document or uploading file: ", error);
            alert('Error submitting report: ' + error.message);
        }
    };
    


    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            handleFileChange(file);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            handleFileChange(file);
        }
    };

    const handleFileChange = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };
    const handlePaste = (e) => {
        const items = e.clipboardData.items;
        for (const item of items) {
            if (item.type.indexOf("image") === 0) {
                const blob = item.getAsFile();
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviewUrl(reader.result);
                };
                reader.readAsDataURL(blob);
            }
        }
    };

    const removeImage = () => {
        setImagePreviewUrl('');
        const imageInputElement = document.getElementById('imageUpload');
        if (imageInputElement) {
            imageInputElement.value = null;
        }
    };


    return (
        <>
            <button onClick={openModal} className="btn-report-bug">
                <i className="bi bi-bug"></i>
            </button>
            <Modal isOpen={isModalOpen} handleClose={closeModal}>
                <span className="close-popup-button" onClick={closeModal}>&times;</span>
                <p className='report-title'>
                    Oops! It looks like something didn't go as planned. We appreciate your help in making our website better. Please describe the issue you encountered, and feel free to include any details you think might help us fix it. Thanks for your patience and assistance!
                </p>
                <form className="modal-form" onSubmit={handleSubmit} onDragEnter={handleDrag}>
                    <textarea
                        ref={bugDescriptionRef}
                        id="bugDescription"
                        name="bugDescription"
                        placeholder='Describe your issue here'
                        onPaste={handlePaste}
                    />
                    <input
                        ref={imageUploadRef}
                        type="file"
                        id="imageUpload"
                        name="imageUpload"
                        onChange={handleChange}
                        style={{ display: 'none' }}
                    />
                    {imagePreviewUrl ? (
                        <div className="image-preview-container">
                            <img src={imagePreviewUrl} alt="Preview" className="image-preview" />
                            <button type="button" className="remove-image-button" onClick={removeImage}>&times;</button>
                        </div>
                    ) : (
                        <div
                            className={`drag-drop-input ${dragActive ? 'active' : ''}`}
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('imageUpload').click()}>
                            <FaArrowDown />

                            Paste or Drag & Drop images here or click to select image.
                        </div>
                    )}

                    <button className='submitButton' type="submit">Send</button>
                </form>
            </Modal>
        </>
    );
};

export default ReportBugBTN;
