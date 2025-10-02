import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

type Props = {
    typeName: keyof typeof Colors.types;
};

const TypeBadge = ({ typeName }: Props) => {
    const badgeColor = Colors.types[typeName] || '#777';

    return (
        <View style={[styles.badge, { backgroundColor: badgeColor }]}>
            <Text style={styles.badgeText}>{typeName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
    },
    badgeText: {
        color: "#fff",
        fontWeight: "bold",
        textTransform: "capitalize",
        fontSize: 12,
    },
});

export default TypeBadge;
