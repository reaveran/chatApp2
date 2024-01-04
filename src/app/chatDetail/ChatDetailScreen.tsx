import { BaseLayout, Text, BackHeaderButton, PhotoAndNameCard, Spinner, Card, CardRow } from "@components";
import {
  Dimensions,
  Modal,
  SectionList,
  SectionListRenderItem,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { commonStyles, variables } from "src/CommonStyles";
import { useGroupDetail } from "./hooks/useGroupDetail";
import Icon from "react-native-ico-material-design";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatMessageSectionListData, useChatDetail } from "./hooks/useChatDetail";
import { ChatMessage } from "./components/ChatMessage";
import { ChatFooter } from "./components/ChatFooter";
import { useDebounceCallback } from "@utils";
import { ChatFooterSearch } from "./components/ChatFooterSearch";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// user id to differentiate message bubble color
const selfId = "me-id";
interface LocationIndex {
  sectionIndex: number;
  itemIndex: number;
}

export const ChatDetailScreen: Navigation.Screen<"ChatDetailScreen"> = (props) => {
  const { route, navigation } = props;
  const { id, groupName, from, photo, isGroup } = route.params.chatList;

  const { data: groupData } = useGroupDetail({ id, enabled: isGroup });

  const {
    data: messages,
    isFetching: isFetchingMessages,
    isFetchingNextPage: isFetchingNextPage,
    fetchNextPage: fetchNextPage,
  } = useChatDetail(id);
  const searchInputRef = useRef<TextInput>(null);
  const sectionList = useRef<SectionList>(null);
  // const [scrollPosition, setScrollPosition] = useState<number>();
  const [scrollPosition, setScrollPosition] = useState<LocationIndex>({ sectionIndex: 0, itemIndex: 0 });
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [isSearchLastIndex, setIsSearchLastIndex] = useState<boolean>(true);
  const [isSearchFirstIndex, setIsSearchFirstIndex] = useState<boolean>(true);
  const [searchText, onChangeSearchText] = useState<string>("");
  const [searchIndex, setSearchIndex] = useState<LocationIndex[]>([]);
  const [activeSearchIndex, setActiveSearchIndex] = useState<number>(0);

  const [sectionsData, setSectionsData] = useState<ChatMessageSectionListData[]>([]);
  const [additionalSectionsData, setAdditionalSectionsData] = useState<ChatMessageSectionListData>();
  const [activeItem, setActiveItem] = useState<Model.ChatMessage>();
  const [isActiveOption, setIsActiveOption] = useState<boolean>(false);

  const groupDetailsText = groupData && groupData.members.map((member) => member.name).join(", ");

  const resetSearch = () => {
    setActiveSearchIndex(0);
    setIsSearchFirstIndex(true);
    setIsSearchLastIndex(true);
  };

  const debounceSearchText = useDebounceCallback((value: string) => {
    const result: LocationIndex[] = [];
    if (messages) {
      messages.forEach((section, sectionI) => {
        section.data.forEach((data, dataI) => {
          if (data.message.toLowerCase().includes(value)) {
            result.push({
              sectionIndex: sectionI,
              itemIndex: dataI,
            });
          }
        });
      });
      setSearchIndex(result);
      resetSearch();
      if (result.length) {
        if (result.length > 1) {
          setIsSearchLastIndex(false);
        }
        sectionList?.current?.scrollToLocation({
          itemIndex: result[0].itemIndex + 1,
          sectionIndex: result[0].sectionIndex,
        });
      }
    }
  });

  useEffect(() => {
    if (messages) {
      setSectionsData(messages);
    }
  }, [messages]);

  const getLastActiveScroll = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem("lastActiveScroll");
      const sectionIndex = parseInt(value || "0");
      if (sectionIndex > 0 && sectionsData.length > sectionIndex && sectionList?.current && !isScrolled) {
        setIsScrolled(true);
        setTimeout(() => {
          sectionList?.current?.scrollToLocation({ sectionIndex: sectionIndex, itemIndex: 1 });
        }, 500);
      }
    } catch (error) {
      // Handle AsyncStorage error
      return null;
    }
  }, [sectionList?.current, isScrolled, sectionsData.length]);

  // Save scroll position when leaving the screen
  useEffect(() => {
    return () => {
      // This function will be called when the component unmounts
      if (scrollPosition) {
        AsyncStorage.setItem("lastActiveScroll", scrollPosition.toString());
      }
    };
  }, [scrollPosition]);

  // Restore scroll position when returning to the screen
  useEffect(() => {
    getLastActiveScroll();
  }, [getLastActiveScroll]);

  const onSearch = (value: string) => {
    onChangeSearchText(value);
    if (value.length >= 2) {
      debounceSearchText(value.toLowerCase());
    } else {
      resetSearch();
      setSearchIndex([]);
    }
  };

  const onPressSearchIcon = () => {
    setIsSearchActive(true);
  };

  const closeSearch = () => {
    setIsSearchActive(false);
    setSearchIndex([]);
    onChangeSearchText("");
  };

  useEffect(() => {
    if (isSearchActive && searchInputRef) {
      searchInputRef?.current?.focus();
    }
  }, [searchInputRef, isSearchActive]);

  const rightHeader = () => {
    return (
      <TouchableOpacity onPress={onPressSearchIcon}>
        <Icon name="searching-magnifying-glass" />
      </TouchableOpacity>
    );
  };

  const leftCloseHeader = () => {
    return (
      <TouchableOpacity onPress={closeSearch}>
        <Icon name="close-button" heigth={17} width={17} />
      </TouchableOpacity>
    );
  };

  const searchHeaderInput = () => {
    return (
      <View>
        <TextInput ref={searchInputRef} value={searchText} onChangeText={onSearch} style={styles.searchContainer} />
      </View>
    );
  };

  const onPressNextPrevSearch = (isNext: boolean) => {
    const maxIndex = searchIndex.length - 1;
    let index = activeSearchIndex;
    if (isNext && index + 1 <= maxIndex) {
      index = index + 1;
    } else if (!isNext && index - 1 >= 0) {
      index = index - 1;
    }

    setIsSearchLastIndex(index === maxIndex ? true : false);
    setIsSearchFirstIndex(index === 0 ? true : false);
    setActiveSearchIndex(index);
    sectionList?.current?.scrollToLocation({
      itemIndex: searchIndex[index].itemIndex + 1,
      sectionIndex: searchIndex[index].sectionIndex,
    });
  };

  const onPressHeader = () => {
    return navigation.navigate("UserOrGroupDetailScreen", { id, isGroup });
  };

  const onPressSend = (value: string) => {
    if (value !== "") {
      const temp = !additionalSectionsData
        ? {
            title: selfId,
            sectionIndex: 0,
            data: [
              {
                id: "d1",
                userId: selfId,
                name: "Me",
                message: value,
                createdAt: new Date().toString(),
              },
            ],
          }
        : { ...additionalSectionsData };
      if (additionalSectionsData) {
        temp.data = [
          {
            // just some random id. Other option is to use uuid.
            id: (Math.floor(Math.random() * (1000 - 1 + 1)) + 1).toString(),
            userId: selfId,
            name: "Me",
            message: value,
            createdAt: new Date().toString(),
          },
          ...temp.data,
        ];
      }
      setAdditionalSectionsData(temp);
    }
  };

  const onLongPressChat = (item: Model.ChatMessage) => {
    setIsActiveOption(true);
    setActiveItem(item);
  };

  useEffect(() => {
    if (additionalSectionsData) {
      setSectionsData([{ ...additionalSectionsData }, ...sectionsData.slice(1)]);
    }
  }, [additionalSectionsData, messages]);

  const renderItem: SectionListRenderItem<Model.ChatMessage> = useCallback(
    ({ item, index, section }) => {
      const selectedSearchIndex = searchIndex.length ? searchIndex[activeSearchIndex] : undefined;
      const isHighlighted =
        isSearchActive &&
        selectedSearchIndex &&
        selectedSearchIndex.itemIndex === index &&
        selectedSearchIndex.sectionIndex === section.sectionIndex;
      return (
        <ChatMessage
          data={item}
          isFirstMessage={index === 0}
          isLastMessage={index === section.data.length - 1}
          isGroup
          isSelfMessage={selfId === item.userId}
          isHighlighted={isHighlighted}
          onLongPress={() => onLongPressChat(item)}
          isActiveOption={isActiveOption}
        />
      );
    },
    [searchIndex, activeSearchIndex]
  );

  const onViewableItemsChanged = useCallback((info: { viewableItems: ViewToken[] }): void => {
    if (info.viewableItems.length > 0) {
      setScrollPosition(info.viewableItems[0]?.section?.sectionIndex);
    }
  }, []);
  return (
    <BaseLayout
      leftHeader={isSearchActive ? leftCloseHeader() : <BackHeaderButton />}
      header={
        isSearchActive ? (
          searchHeaderInput()
        ) : (
          <PhotoAndNameCard
            photo={photo}
            name={(isGroup ? groupName : from) ?? ""}
            subtitle={groupDetailsText}
            onPress={onPressHeader}
          />
        )
      }
      rightHeader={rightHeader()}
      footer={
        isSearchActive ? (
          <ChatFooterSearch
            onPressNext={() => onPressNextPrevSearch(true)}
            onPressPrev={() => onPressNextPrevSearch(false)}
            isAtFirstIndex={isSearchFirstIndex}
            isAtLastIndex={isSearchLastIndex}
          />
        ) : (
          <ChatFooter onPressSend={(value) => onPressSend(value)} />
        )
      }
      backgroundColor="darkGrey3"
    >
      <SectionList
        ref={sectionList}
        contentContainerStyle={styles.container}
        sections={(sectionsData as unknown as ChatMessageSectionListData[]) || []}
        renderItem={renderItem}
        refreshing={isFetchingMessages}
        ListFooterComponent={isFetchingNextPage ? <Spinner /> : null}
        // @ts-expect-error
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.2}
        inverted
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve as () => void, 700));
          wait.then(() => {
            sectionList.current?.scrollToLocation({ sectionIndex: info.index, itemIndex: 1 });
          });
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 80, //means if 80% of the item is visible
        }}
      />
      <Modal visible={isActiveOption} animationType="fade" transparent={true}>
        <TouchableOpacity activeOpacity={1} onPress={() => setIsActiveOption(false)} style={styles.overlay}>
          <View style={styles.modalContainer}>
            {activeItem && (
              <ChatMessage
                data={activeItem}
                isFirstMessage={true}
                isLastMessage={true}
                isGroup
                isSelfMessage={selfId === activeItem.userId}
                isHighlighted={false}
                isActiveOption={isActiveOption}
              />
            )}
            {/* some dummy options */}
            <Card style={commonStyles.marginTop}>
              <CardRow withBorder onPress={() => {}}>
                <Text>Reply</Text>
              </CardRow>
              <CardRow withBorder onPress={() => {}}>
                <Text>Copy</Text>
              </CardRow>
              <CardRow onPress={() => {}}>
                <Text color="red">Delete</Text>
              </CardRow>
            </Card>
          </View>
        </TouchableOpacity>
      </Modal>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: variables.baseSpacing,
    flexGrow: 1,
  },
  searchContainer: {
    ...commonStyles.border,
    borderRadius: variables.baseSpacing,
    height: 35,
    padding: variables.baseSpacing,
    marginRight: variables.baseSpacing,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContainer: {
    padding: 20,
    borderRadius: 10,
    width: "80%", // Set width as per your requirement
    overflow: "hidden",
  },
});
