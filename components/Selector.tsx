import { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Option {
  label: string;
  value: string;
}

interface SelectorProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  color?: string;
  placeholder?: string;
}

export default function Selector({
  options,
  value,
  onChange,
  color = "#000",
  placeholder = "Select an option",
}: SelectorProps) {
  const [open, setOpen] = useState(false);
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <>
      {/* Trigger Button */}
      <TouchableOpacity
        style={[styles.selectorButton, { borderColor: color }]}
        onPress={() => setOpen(true)}
      >
        <Text style={[styles.selectorText, { color }]}>{selectedLabel}</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={open}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selectorButton: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  selectorText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    paddingVertical: 8,
    maxHeight: "50%",
  },
  optionButton: {
    padding: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
  },
});
