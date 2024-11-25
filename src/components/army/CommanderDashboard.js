// CommanderDashboard.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers, fetchStats } from '../../redux/slices/commanderSlice';
import styles from './CommanderDashboard.module.css';
const CommanderDashboard = () => {
    const dispatch = useDispatch();
    const [selectedUser, setSelectedUser] = useState(null);
    const [filterOrg, setFilterOrg] = useState('');
    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchStats());
    }, [dispatch]);
    // דוגמה ליוזר
    const users = [
        {
            id: '1',
            name: 'Yahya Sinwar',
            organization: 'Hamas',
            threatLevel: 3,
            suspiciousMessages: 5,
            lastActive: '2024-03-21',
            image: 'data:image/jpeg;base64,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',
        },
    ];
    const stats = {
        totalMessages: 100,
        suspiciousMessages: 50,
        activeUsers: 25,
        organizationsStats: [
            { name: 'Hamas', userCount: 10, suspiciousCount: 20 },
        ]
    };
    const filteredUsers = users.filter(user => !filterOrg || user.organization.toLowerCase().includes(filterOrg.toLowerCase()));
    return (React.createElement("div", { className: styles.dashboard },
        React.createElement("h2", null, "\u05DB\u05DC \u05D4\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05DB\u05E8\u05D2\u05E2 \u05D6\u05D4 \u05E8\u05E7 \u05D3\u05D5\u05D2\u05DE\u05D4"),
        React.createElement("div", { className: styles.statsContainer },
            React.createElement("div", { className: styles.statBox },
                React.createElement("h3", null, "Total Messages"),
                React.createElement("p", null, stats.totalMessages)),
            React.createElement("div", { className: styles.statBox },
                React.createElement("h3", null, "Suspicious Messages"),
                React.createElement("p", null, stats.suspiciousMessages)),
            React.createElement("div", { className: styles.statBox },
                React.createElement("h3", null, "Active Users"),
                React.createElement("p", null, stats.activeUsers))),
        React.createElement("div", { className: styles.filters },
            React.createElement("input", { type: "text", placeholder: "Filter by organization...", value: filterOrg, onChange: (e) => setFilterOrg(e.target.value), className: styles.filterInput })),
        React.createElement("div", { className: styles.tableContainer },
            React.createElement("table", { className: styles.table },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Username"),
                        React.createElement("th", null, "Organization"),
                        React.createElement("th", null, "Threat Level"),
                        React.createElement("th", null, "Suspicious Messages"),
                        React.createElement("th", null, "Last Active"),
                        React.createElement("th", null, "Actions"))),
                React.createElement("tbody", null, filteredUsers.map(user => (React.createElement("tr", { key: user.id, className: user.threatLevel >= 3 ? styles.highThreat : '' },
                    React.createElement("td", null, user.name),
                    React.createElement("td", null, user.organization),
                    React.createElement("td", null,
                        React.createElement("div", { className: styles.threatLevel }, Array.from({ length: 5 }).map((_, i) => (React.createElement("span", { key: i, className: i < user.threatLevel ? styles.threatActive : styles.threatInactive }, "\u25CF"))))),
                    React.createElement("td", null, user.suspiciousMessages),
                    React.createElement("td", null, user.lastActive),
                    React.createElement("td", null,
                        React.createElement("button", { onClick: () => setSelectedUser(user), className: styles.viewButton }, "View Details")))))))),
        React.createElement("div", { className: styles.orgStats },
            React.createElement("h3", null, "Organizations Overview"),
            React.createElement("table", { className: styles.table },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Organization"),
                        React.createElement("th", null, "Users"),
                        React.createElement("th", null, "Suspicious Activity"))),
                React.createElement("tbody", null, stats.organizationsStats.map(org => (React.createElement("tr", { key: org.name },
                    React.createElement("td", null, org.name),
                    React.createElement("td", null, org.userCount),
                    React.createElement("td", null, org.suspiciousCount))))))),
        selectedUser && (React.createElement("div", { className: styles.modal },
            React.createElement("div", { className: styles.modalContent },
                React.createElement("p", null, "User Details"),
                React.createElement("h2", null,
                    " ",
                    selectedUser.name),
                React.createElement("p", null,
                    "Organization: ",
                    selectedUser.organization),
                React.createElement("p", null,
                    "Threat Level: ",
                    selectedUser.threatLevel),
                React.createElement("img", { src: selectedUser.image, alt: `${selectedUser.name}'s profile`, className: styles.userImage }),
                React.createElement("button", { onClick: () => setSelectedUser(null) }, "Close"))))));
};
export default CommanderDashboard;
