import { useState } from "react";
import { Heading, useToast, VStack } from "native-base";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPool() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        toast.show({
          title: "Informe o código do bolão",
          placement: "top",
          bgColor: "red.500",
        });

        return;
      }

      await api.post("/pools/join", { code });
      navigate("pools");

      toast.show({
        title: `Você entrou no bolão ${code} com sucesso`,
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      console.log(error);

      setIsLoading(false);

      if (error.response?.data?.message === "Pool not found.") {
        toast.show({
          title: "Bolão não encontrado!",
          placement: "top",
          bgColor: "red.500",
        });

        return;
      }

      if (error.response?.data?.message === "You already joinde this pool.") {
        toast.show({
          title: "Você já está nesse bolão!",
          placement: "top",
          bgColor: "red.500",
        });

        return;
      }

      toast.show({
        title: "Não foi possível encontrar o bolão",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
          value={code}
        />

        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
