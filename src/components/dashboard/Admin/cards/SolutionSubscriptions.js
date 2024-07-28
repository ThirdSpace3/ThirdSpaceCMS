import React, { useState, useEffect } from 'react';
import { db, collection, getDocs } from '../../../../firebaseConfig'; // Adjust path as necessary
import './SolutionSubscriptions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faAngleUp, faAngleDown, faEquals } from '@fortawesome/free-solid-svg-icons';

const SolutionSubscriptions = ({ dateOption, preciseDate, startDate, endDate }) => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalSubscriptions, setTotalSubscriptions] = useState(0);
    const [subscriptionsInRange, setSubscriptionsInRange] = useState(0);
    const [growthPercentage, setGrowthPercentage] = useState(0);

    useEffect(() => {
        fetchSubscriptions();
    }, [dateOption, preciseDate, startDate, endDate]);

    const fetchSubscriptions = async () => {
        try {
            const subscriptionsCollectionRef = collection(db, 'SolutionSubscriptions'); // Adjust the collection name as necessary
            const querySnapshot = await getDocs(subscriptionsCollectionRef);

            const subscriptionsData = [];
            querySnapshot.forEach((doc) => {
                subscriptionsData.push({ id: doc.id, ...doc.data() });
            });

            const totalSubscriptionsCount = subscriptionsData.length;
            const subscriptionsInRangeCount = calculateSubscriptionsInRange(subscriptionsData);

            setSubscriptions(subscriptionsData);
            setTotalSubscriptions(totalSubscriptionsCount);
            setSubscriptionsInRange(subscriptionsInRangeCount);
            setGrowthPercentage(calculateGrowthPercentage(totalSubscriptionsCount, subscriptionsInRangeCount));
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching subscriptions data:", error);
            setIsLoading(false);
        }
    };

    const calculateSubscriptionsInRange = (subscriptionsData) => {
        if (dateOption === 'precise') {
            return subscriptionsData.filter(subscription => {
                const subscriptionDate = new Date(subscription.timestamp.seconds * 1000); // convert Firestore timestamp to Date
                return subscriptionDate.toDateString() === preciseDate.toDateString();
            }).length;
        } else {
            return subscriptionsData.filter(subscription => {
                const subscriptionDate = new Date(subscription.timestamp.seconds * 1000); // convert Firestore timestamp to Date
                return subscriptionDate >= startDate && subscriptionDate <= endDate;
            }).length;
        }
    };

    const calculateGrowthPercentage = (totalSubscriptions, subscriptionsInRange) => {
        if (totalSubscriptions === 0) return 0;
        return ((subscriptionsInRange / totalSubscriptions) * 100).toFixed(2);
    };

    const getGrowthClass = (growthPercentage) => {
        if (growthPercentage > 0) {
            return 'subscription-growth-positive';
        } else if (growthPercentage < 0) {
            return 'subscription-growth-negative';
        } else {
            return 'subscription-growth-null';
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
        <div className="subscription-container">
            <div className="subscription-box">
                <div className="subscription-summary">
                    <p className='subscription-summary-title'> <FontAwesomeIcon icon={faStar} /> Subscriptions </p>
                    <div className='subscription-summary-count'>
                        <p className='subscription-count'>In Coming...</p>
                        {/* <p className={`project-growth ${getGrowthClass(growthPercentage)}`}>
                            {growthPercentage}% <FontAwesomeIcon icon={getGrowthIcon(growthPercentage)} />
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolutionSubscriptions;
