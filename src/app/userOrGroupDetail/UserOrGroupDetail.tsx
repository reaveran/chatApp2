import { useGroupDetail } from "@app/chatDetail/hooks/useGroupDetail";
import { useUserDetail } from "@app/chatDetail/hooks/useUserDetail";
import { BaseLayout, Text, BackHeaderButton, Avatar, Card, CardRow, PhotoAndNameCard } from "@components";
import { ScrollView, StyleSheet, View } from "react-native";
import { commonStyles, variables } from "src/CommonStyles";

const MAX_DISPLAY_MEMBER = 4;

export const UserOrGroupDetailScreen: Navigation.Screen<"UserOrGroupDetailScreen"> = (props) => {
  const { id, isGroup } = props.route.params;
  const { data: groupData } = useGroupDetail({ id, enabled: isGroup });
  const { data: userData } = useUserDetail({ id, enabled: !isGroup });

  const title = isGroup ? "Group Info" : "Contact Info";
  const photo = isGroup ? groupData?.photo : userData?.photo;
  const name = isGroup ? groupData?.name : userData?.name;
  const profileDetail = isGroup ? `Group · ${groupData?.members.length || 0} members` : userData?.phoneNumber;
  const status = isGroup ? groupData?.description || "No description" : userData?.status || "No status";
  const isGroupMemberMoreThanMaxDisplay = (groupData?.members.length || 0) > MAX_DISPLAY_MEMBER;

  return (
    <BaseLayout leftHeader={<BackHeaderButton />} headerText={title}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={commonStyles.alignCenter}>
          <Avatar url={photo} alt={name || ""} size="large" />
          <Text marginTop type="headline1">
            {name}
          </Text>
          <Text>{profileDetail}</Text>
        </View>
        <View style={commonStyles.marginTop2Base}>
          <Card style={commonStyles.marginBottom2Base}>
            <CardRow>
              <Text>{status}</Text>
            </CardRow>
          </Card>

          {isGroup && (
            <View style={commonStyles.marginBottom2Base}>
              <Text type="subtitle1" marginBottom>{`${groupData?.members.length} Members`}</Text>
              <Card>
                {groupData?.members.slice(0, MAX_DISPLAY_MEMBER).map((member, index) => (
                  <CardRow
                    withBorder={groupData?.members.length !== index + 1 || isGroupMemberMoreThanMaxDisplay}
                    key={member.id}
                    onPress={() => {}}
                  >
                    <PhotoAndNameCard name={member.name} photo={member.photo} subtitle={member.status} />
                  </CardRow>
                ))}
                {isGroupMemberMoreThanMaxDisplay && (
                  <CardRow withBorder onPress={() => {}}>
                    <Text color="theme">More...</Text>
                  </CardRow>
                )}
              </Card>
            </View>
          )}

          {/* some dummy button */}
          <Card>
            <CardRow withBorder onPress={() => {}}>
              <Text color="theme">Export chat</Text>
            </CardRow>
            <CardRow onPress={() => {}}>
              <Text color="red">Clear chat</Text>
            </CardRow>
          </Card>
        </View>
      </ScrollView>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: variables.baseSpacing,
  },
});
