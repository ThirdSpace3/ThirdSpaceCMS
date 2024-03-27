import React from 'react';

const styles = {
    blogSection: {
        backgroundColor: '#FFFFFF', // Assuming a light background
        padding: '50px 20px',
        textAlign: 'center',
    },
    blogHeading: {
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '2rem',
    },
    blogsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexdirection :'column',
        flexWrap: 'wrap',
        gap: '30px', // Adjust based on the image's layout
    },
    blogCard: {
        width: '300px', // Adjust according to the image
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Soft shadow for depth
        overflow: 'hidden', // Ensures everything stays inside the border radius
    },
    blogImage: {
        width: '100%',
        height: '200px', // Adjust height as needed
        objectFit: 'cover', // Ensures the image covers the area nicely
        marginBottom: '15px',
    },
    blogTitle: {
        fontSize: '1.5rem',
        color: '#333',
        padding: '0 20px', // Padding inside the card for text
        marginBottom: '10px',
    },
    blogSummary: {
        fontSize: '1rem',
        color: '#666',
        padding: '0 20px',
        marginBottom: '20px',
    },
    readMoreButton: {
        display: 'block', // Ensures the button takes the full width of its container
        width: '30%', // Accounts for padding
        left:'0',
        padding: '10px',
        color: 'black',
        border: 'none',
    },
    Button:{
        margin:'25px',
        width:'162px',
        height:'60px',
        backgroundColor:' black',
        color:'white',
        fontSize:'20px',
    }
};

// Placeholder for blog images
const blogImages = ['https://via.placeholder.com/365x234', 'https://via.placeholder.com/365x234', 'https://via.placeholder.com/365x234'];

const blogs = [
    { title: 'Blog Post One', summary: 'Summary of blog post one...', summary2: 'Summary2 of blog post one...' },
    { title: 'Blog Post Two', summary: 'Summary of blog post two...' , summary2: 'Summary2 of blog post two...' },
    { title: 'Blog Post Three', summary: 'Summary of blog post three...' , summary2: 'Summary2 of blog post three...' },
];

const BlogSection = () => {
    return (
        <section style={styles.blogSection}>
            <h2 style={styles.blogHeading}>Latest Blog</h2>
            <div style={styles.blogsContainer}>
                {blogs.map((blog, index) => (
                    <div key={index} style={styles.blogCard}>
                        <img
                            style={styles.blogImage}
                            src={blogImages[index]} // Assuming a different image for each blog
                            alt={`Blog Post ${index + 1}`}
                        />
                        <h3 style={styles.blogTitle}>{blog.title}</h3>
                        <p style={styles.blogSummary}>

                            {blog.summary}
                            <br></br>
                            {blog.summary2}
                        </p>
                        <button style={styles.readMoreButton}>Learn More</button>
                    </div>
                ))}
            </div>                
            <button style={styles.Button}>Button</button>

        </section>
    );
};

export default BlogSection;
