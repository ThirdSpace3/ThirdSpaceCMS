import React, { useState, useRef } from 'react';
import './ReportBugBTN.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
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
    const [isSaving, setIsSaving] = useState(false);
    const imageUploadRef = useRef(null);
    const bugDescriptionRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSaving(true);

        let imageUrl = '';
        const bugDescription = bugDescriptionRef.current ? bugDescriptionRef.current.value : '';

        try {
            if (imagePreviewUrl && selectedFile) { // Change this line
                const imageFile = selectedFile; // Add this line
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
                setTimeout(() => {
                    closeModal();
                }, 2000);
            } else {
                alert('Please provide a description.');
                setIsSaving(false);
            }
        } catch (error) {
            console.error("Error: ", error);
            alert('Error submitting report: ' + error.message);
            setIsSaving(false);
        }
    };

    const closeModal = () => {
        setIsSaving(false);
        setModalOpen(false);
    };

    const openModal = () => {
        setIsSaving(false);
        setModalOpen(true);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
            setSelectedFile(e.dataTransfer.files[0]); // Add this line
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0]);
        }
    };

    const handleFileChange = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
        setSelectedFile(file); // Add this line
    };
   
    const handlePaste = (e) => {
        const items = e.clipboardData.items;
        for (const item of items) {
            if (item.kind === 'file' && item.type.indexOf("image") === 0) {
                const file = item.getAsFile();
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviewUrl(reader.result);
                };
                reader.readAsDataURL(file);
                setSelectedFile(file); // Add this line
            }
        }
    };

    const removeImage = () => {
        setImagePreviewUrl('');
        if (imageUploadRef.current) {
            imageUploadRef.current.value = null;
        }
    };

    return (
        <>
            <button onClick={openModal} className="btn-report-bug">
                <i className="bi bi-bug"></i>
            </button>
            <Modal isOpen={isModalOpen} handleClose={closeModal}>
                {isSaving ? (
                    <div className='saved-message'><i className="bi bi-rocket-takeoff"></i> Thanks for your report! Our team will work on this issue soon.</div>
                ) : (
                    <>
                        <span className="close-popup-button" onClick={closeModal}>&times;</span>
                        <p className='report-title'>
                            Oops! It looks like something didn't go as planned. We appreciate your help in making our website better. Please describe the issue you encountered, and feel free to include any details you think might help us fix it. Thanks for your patience and assistance!
                        </p>
                        <form className="modal-form" onSubmit={handleSubmit} onDragEnter={handleDrag} onPaste={handlePaste}>
                            <textarea
                                ref={bugDescriptionRef}
                                id="bugDescription"
                                name="bugDescription"
                                placeholder='Describe your issue here'
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
                                    <i class="bi bi-download"></i>
                                    Paste or Drag & Drop images here or click to select image.
                                </div>
                            )}

                            <button className='submitButton' type="submit">Send</button>
                        </form>
                    </>
                )}
            </Modal>
        </>
    );
};

export default ReportBugBTN;
