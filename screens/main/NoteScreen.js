import React, { useState, useContext } from "react";
import { View, TextInput, Text, Button } from "react-native";
import { NoteContext } from "../../contexts";

export default function NoteScreen({ navigation }) {
  const { notes, addNote } = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSaveNote = () => {
    addNote(title, content);
    setTitle("");
    setContent("");
    navigation.goBack();
  };

  return (
    <View>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={{ borderColor: "gray", borderWidth: 1 }}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Type your note here..."
        style={{ borderColor: "gray", borderWidth: 1 }}
      />
      <Button title="Save Note" onPress={handleSaveNote} />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}
