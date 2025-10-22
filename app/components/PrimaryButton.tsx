import { Pressable, Text } from 'react-native';

export default function PrimaryButton({ text }: { text: string }) {
    return (
        <Pressable style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: "#F75270",
        }}>
            <Text style={{
                color: 'white'
            }}>{text}</Text>
        </Pressable>
    );
}