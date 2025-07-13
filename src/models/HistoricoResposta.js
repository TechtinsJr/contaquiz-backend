module.exports = (sequelize, DataTypes) => {
    const HistoricoResposta = sequelize.define('HistoricoResposta', {
        dataHora: DataTypes.DATE
    });

    HistoricoResposta.associate = models => {
        HistoricoResposta.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
        HistoricoResposta.belongsTo(models.Pergunta, { foreignKey: 'perguntaId' });
        HistoricoResposta.belongsTo(models.Resposta, { foreignKey: 'respostaId' });
    };

    return HistoricoResposta;
};