import React, { useState, useEffect } from 'react';
import { db, collection, getDocs } from '../../../../firebaseConfig'; // Adjust path as necessary
import './NewsletterSubscription.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faAngleUp, faAngleDown, faEquals } from '@fortawesome/free-solid-svg-icons';

const NewsletterSubscription = ({ dateOption, preciseDate, startDate, endDate }) => {
    const [newsletters, setNewsletters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalNewsletters, setTotalNewsletters] = useState(0);
    const [newslettersInRange, setNewslettersInRange] = useState(0);
    const [growthPercentage, setGrowthPercentage] = useState(0);

    useEffect(() => {
        fetchNewsletters();
    }, [dateOption, preciseDate, startDate, endDate]);

    const fetchNewsletters = async () => {
        try {
            const newslettersCollectionRef = collection(db, 'UserContactInfos', 'Contact', 'Newsletter');
            const querySnapshot = await getDocs(newslettersCollectionRef);

            const newslettersData = [];
            querySnapshot.forEach((doc) => {
                newslettersData.push({ id: doc.id, ...doc.data() });
            });

            const totalNewslettersCount = newslettersData.length;
            const newslettersInRangeCount = calculateNewslettersInRange(newslettersData);

            setNewsletters(newslettersData);
            setTotalNewsletters(totalNewslettersCount);
            setNewslettersInRange(newslettersInRangeCount);
            setGrowthPercentage(calculateGrowthPercentage(totalNewslettersCount, newslettersInRangeCount));
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching newsletters data:", error);
            setIsLoading(false);
        }
    };

    const calculateNewslettersInRange = (newslettersData) => {
        if (dateOption === 'precise') {
            return newslettersData.filter(newsletter => {
                const newsletterDate = new Date(newsletter.timestamp.seconds * 1000); // convert Firestore timestamp to Date
                return newsletterDate.toDateString() === preciseDate.toDateString();
            }).length;
        } else {
            return newslettersData.filter(newsletter => {
                const newsletterDate = new Date(newsletter.timestamp.seconds * 1000); // convert Firestore timestamp to Date
                return newsletterDate >= startDate && newsletterDate <= endDate;
            }).length;
        }
    };

    const calculateGrowthPercentage = (totalNewsletters, newslettersInRange) => {
        if (totalNewsletters === 0) return 0;
        return ((newslettersInRange / totalNewsletters) * 100).toFixed(2);
    };

    const getGrowthClass = (growthPercentage) => {
        if (growthPercentage > 0) {
            return 'newsletter-growth-positive';
        } else if (growthPercentage < 0) {
            return 'newsletter-growth-negative';
        } else {
            return 'newsletter-growth-null';
        }
    };
    const getGrowthIcon = (growthPercentage) => {
        if (growthPercentage > 0) {
            return faAngleUp;
        } else if (growthPercentage < 0) {
            return faAngleDown;
        } else {
            return faEquals;
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="newsletter-container">
            <div className="newsletter-box">
                <div className="newsletter-summary">
                    <p className='newsletter-summary-title'><FontAwesomeIcon icon={faPlusCircle} /> Newsletters Subscribed </p>
                    <div className='newsletter-summary-count'>
                        <p className='newsletter-count'>{newslettersInRange}</p>
                        <p className={`wallet-growth ${getGrowthClass(growthPercentage)}`}>
                            {growthPercentage}% <FontAwesomeIcon icon={getGrowthIcon(growthPercentage)} />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsletterSubscription;
