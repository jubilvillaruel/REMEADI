import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

import { styles } from './../../assets/css/Style';
import { IconCard } from '../components/Cards';

import locked from '../../assets/images/locked.png';
import { screenHeight } from '../components/Dimensions';

import { christianityMDB, islamMDB, hinduismMDB, buddhismMDB, judaismMDB } from '../Data/MilestonesDB';


export default function Milestones() {
    const [selectedChips, setSelectedChips] = useState([]);
    const [isLocked, setIsLocked] = useState(true);

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
            <View style={[styles.dropShadow, { zIndex: 1, marginTop: 40 }]}>
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
                    {selectedChips.length === 0 ? (
                        // Render all Milestones when no filter is selected 
                        <>
                            {Object.entries(christianityMDB).map(([title, desc], index) => (
                                <IconCard key={index} title={title} desc={desc} icon={locked} />
                            ))}

                            {Object.entries(islamMDB).map(([title, desc], index) => (
                                <IconCard key={index} title={title} desc={desc} icon={locked} />
                            ))}

                            {Object.entries(hinduismMDB).map(([title, desc], index) => (
                                <IconCard key={index} title={title} desc={desc} icon={locked} />
                            ))}

                            {Object.entries(buddhismMDB).map(([title, desc], index) => (
                                <IconCard key={index} title={title} desc={desc} icon={locked} />
                            ))}

                            {Object.entries(judaismMDB).map(([title, desc], index) => (
                                <IconCard key={index} title={title} desc={desc} icon={locked} />
                            ))}
                        </>
                    ) : (
                        // Render Milestones based on the selected filter
                        <>
                            {selectedChips.includes('Christianity') &&
                                Object.entries(christianityMDB).map(([title, desc], index) => (
                                    <IconCard key={index} title={title} desc={desc} icon={locked} />
                                ))}

                            {selectedChips.includes('Islam') &&
                                Object.entries(islamMDB).map(([title, desc], index) => (
                                    <IconCard key={index} title={title} desc={desc} icon={locked} />
                                ))}

                            {selectedChips.includes('Hinduism') &&
                                Object.entries(hinduismMDB).map(([title, desc], index) => (
                                    <IconCard key={index} title={title} desc={desc} icon={locked} />
                                ))}

                            {selectedChips.includes('Buddhism') &&
                                Object.entries(buddhismMDB).map(([title, desc], index) => (
                                    <IconCard key={index} title={title} desc={desc} icon={locked} />
                                ))}

                            {selectedChips.includes('Judaism') &&
                                Object.entries(judaismMDB).map(([title, desc], index) => (
                                    <IconCard key={index} title={title} desc={desc} icon={locked} />
                                ))}
                        </>
                    )}
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
        height: screenHeight('5%'),
        paddingHorizontal: 15,
        marginHorizontal: 5,
        borderRadius: 20,
        borderWidth: 2,
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