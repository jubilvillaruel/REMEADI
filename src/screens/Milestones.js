import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';

import { styles } from './../../assets/css/Style';
import { MilestoneCard, MilestoneLockedCard } from '../components/cards';

import locked from '../../assets/images/locked.png';

export default function Milestones() {
    const [selectedChips, setSelectedChips] = useState([]);

    const handleChipPress = (chip) => {
        if (selectedChips.includes(chip)) {
            setSelectedChips(selectedChips.filter((selectedChip) => selectedChip !== chip));
        } else {
            setSelectedChips([...selectedChips, chip]);
        }
    };

    const isChipSelected = (chip) => selectedChips.includes(chip);

    useEffect (() => {
        console.log(selectedChips);
    }, [selectedChips]);


    return (
        <SafeAreaView style={inStyles.container}>
            <View style={[styles.dropShadow, { zIndex: 1 }]}>
                <View style={inStyles.titleContainer}>
                    <Text style={[styles.colorPrimary, inStyles.title]}>Milestones</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={inStyles.filterContainer}>
                        <TouchableOpacity
                            style={[inStyles.filterItem, isChipSelected('Christianity') && inStyles.selectedFilterItem]}
                            onPress={() => handleChipPress('Christianity')}>
                            <Text style={[inStyles.filterItemText, isChipSelected('Christianity') && inStyles.selectedFilterItemText]}>
                                Christianity
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[inStyles.filterItem, isChipSelected('Islam') && inStyles.selectedFilterItem]}
                            onPress={() => handleChipPress('Islam')}>
                            <Text style={[inStyles.filterItemText, isChipSelected('Islam') && inStyles.selectedFilterItemText]}>
                                Islam
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[inStyles.filterItem, isChipSelected('Hinduism') && inStyles.selectedFilterItem]}
                            onPress={() => handleChipPress('Hinduism')}>
                            <Text style={[inStyles.filterItemText, isChipSelected('Hinduism') && inStyles.selectedFilterItemText]}>
                                Hinduism
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[inStyles.filterItem, isChipSelected('Buddhism') && inStyles.selectedFilterItem]}
                            onPress={() => handleChipPress('Buddhism')}>
                            <Text style={[inStyles.filterItemText, isChipSelected('Buddhism') && inStyles.selectedFilterItemText]}>
                                Buddhism
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[inStyles.filterItem, isChipSelected('Judaism') && inStyles.selectedFilterItem]}
                            onPress={() => handleChipPress('Judaism')}>
                            <Text style={[inStyles.filterItemText, isChipSelected('Judaism') && inStyles.selectedFilterItemText]}>
                                Judaism
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={inStyles.milestoneContainer}>
                    <MilestoneCard title='Milestone Title' desc='Description'></MilestoneCard>
                    <MilestoneCard title='Milestone Title' desc='Description'></MilestoneCard>
                    <MilestoneCard title='Milestone Title' desc='Description'></MilestoneCard>
                    <MilestoneCard title='Milestone Title' desc='Description'></MilestoneCard>
                    <MilestoneCard title='Milestone Title' desc='Description'></MilestoneCard>
                    <MilestoneCard title='Milestone Title' desc='Description'></MilestoneCard>
                    <MilestoneCard title='Milestone Title' desc='Description'></MilestoneCard>
                    <MilestoneCard title='Milestone Title' desc='Description'></MilestoneCard>
                    <MilestoneLockedCard title='Milestone Title' desc='Description' icon={locked}></MilestoneLockedCard>
                    <MilestoneLockedCard title='Milestone Title' desc='Description' icon={locked}></MilestoneLockedCard>
                    <MilestoneLockedCard title='Milestone Title' desc='Description' icon={locked}></MilestoneLockedCard>
                    <MilestoneLockedCard title='Milestone Title' desc='Description' icon={locked}></MilestoneLockedCard>
                    <MilestoneLockedCard title='Milestone Title' desc='Description' icon={locked}></MilestoneLockedCard>
                    <MilestoneLockedCard title='Milestone Title' desc='Description' icon={locked}></MilestoneLockedCard>
                    <MilestoneLockedCard title='Milestone Title' desc='Description' icon={locked}></MilestoneLockedCard>
                    <MilestoneLockedCard title='Milestone Title' desc='Description' icon={locked}></MilestoneLockedCard>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const inStyles = StyleSheet.create({
    titleContainer: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    filterContainer: {
        flexDirection: 'row',
        padding: 15,
        marginHorizontal: 5,
    },

    filterItem: {
        padding: 15,
        height: 35,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#2EC4B6',
        justifyContent: 'center',
        alignItems: 'center',
    },

    selectedFilterItem: {
        backgroundColor: '#2EC4B6',
    },

    filterItemText: {
        color: '#000000',
        fontSize: 14,
    },

    selectedFilterItemText: {
        color: '#FFFFFF',
        fontSize: 14,
    },

    milestoneContainer: {
        padding: 15,
    },
});