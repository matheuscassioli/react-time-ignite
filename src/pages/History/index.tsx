import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";
import { ptBR } from "date-fns/locale/pt-BR";
import { formatDistanceToNow } from "date-fns";

const History = () => {
  const { cycles } = useContext(CyclesContext);

  interface Task {
    finishedDate?: Date | null;
    interruptedDate?: Date | null;
  }

  const renderCycleStatus = (task: Task) => {
    const { finishedDate, interruptedDate } = task;

    if (finishedDate) {
      return <Status statusColor="green">Concluido</Status>;
    }
    if (interruptedDate) {
      return <Status statusColor="red">Interrompido</Status>;
    }
    if (!finishedDate && !interruptedDate) {
      return <Status statusColor="yellow">Em andamento</Status>;
    }
  };

  return (
    <HistoryContainer>
      <h1>Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((line) => {
              return (
                <tr key={line.id}>
                  <td>{line.task}</td>
                  <td>{line.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(line.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>{renderCycleStatus(line)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
};

export default History;
