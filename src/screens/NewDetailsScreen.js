import React, { useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import Video from 'react-native-video';

const NewDetailsScreen = ({ videoUri, closeModal }) => {

  const [visibleVideoIndex, setVisibleVideoIndex] = useState(null);
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const data = [
    { id: '1', title: 'Item 1', color: 'red', videoUri },
    { id: '2', title: 'Item 2', color: 'blue', videoUri },
    // Add more items as needed
  ];

  const horizontalData = [
    { id: '1', title: 'Horizontal 1' },
    { id: '2', title: 'Horizontal 2' },
    { id: '3', title: 'Horizontal 3' },
    // Add more items as needed
  ];

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setVisibleVideoIndex(index);
      
      // Automatically play the video when it becomes visible
      setPlayingVideoIndex(index);
    }
  }).current;

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.item, { backgroundColor: item.color }]}
      onPress={() => {
        if (playingVideoIndex === index) {
          setPlayingVideoIndex(null); // Pause the video
        } else {
          setPlayingVideoIndex(index); // Play the video
        }
      }}
    >
      <Text style={styles.text}>{item.title}</Text>
      <TouchableOpacity style={styles.closeButtonContainer} onPress={closeModal}>
        <Image
          source={require('../assets/icons/close_icon.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Video
        source={{ uri: item.videoUri }}
        style={styles.video}
        controls={false}
        resizeMode="cover"
        repeat={true}
        paused={playingVideoIndex !== index}
      />
      {playingVideoIndex !== index && visibleVideoIndex === index && (
        <View style={styles.playPauseContainer}>
          <Image
            source={require('../assets/icons/play_player.png')}
            style={styles.playPauseIcon}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  const renderHorizontalItem = ({ item }) => (
    <View style={styles.horizontalItem}>
      <Text style={styles.horizontalText}>{item.title}</Text>
    </View>
  );

  // return (
  //   <FlatList
  //     data={data}
  //     renderItem={renderItem}
  //     keyExtractor={item => item.id}
  //     pagingEnabled
  //     showsVerticalScrollIndicator={false}
  //     snapToAlignment="start"
  //     decelerationRate="fast"
  //     snapToInterval={Dimensions.get('window').height}
  //     viewabilityConfig={viewabilityConfig}
  //     onViewableItemsChanged={onViewableItemsChanged}
  //   />
  // );

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth * 0.9;  // 60% of the screen width
  const sideItemWidth = (screenWidth - itemWidth) / 2; // 20% on each side

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={Dimensions.get('window').height}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      {/* New Horizontal FlatList */}
      <FlatList
        data={horizontalData}
        renderItem={renderHorizontalItem}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={itemWidth}  // Snap to each item
        contentContainerStyle={{
          paddingHorizontal: sideItemWidth, // To ensure the first and last items are fully visible
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    borderRadius: 15,
    padding: 5,
  },
  text: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  playPauseContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalList: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  horizontalItem: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  playPauseButton: {
    backgroundColor: 'transparent',
    borderRadius: 30,
    padding: 10,
  },
  playPauseIcon: {
    width: 50,
    height: 50,
  },
});

export default NewDetailsScreen;
